#!/usr/bin/env python3
"""Fail if any HTML canonical points at a path with no file in this repo.

Usage: python3 scripts/check-canonicals.py
"""

from __future__ import annotations

import sys
from pathlib import Path
from urllib.parse import unquote, urlparse
import re

ROOT = Path(__file__).resolve().parent.parent
SITE_HOSTS = {"trushineservice.com", "www.trushineservice.com"}
SKIP_DIRS = {".git", "node_modules", ".vercel"}

# rel=canonical may appear before or after href. Match the whole link tag.
CANONICAL_TAG = re.compile(
    r"<link\b[^>]*\brel\s*=\s*[\"']canonical[\"'][^>]*>",
    re.IGNORECASE,
)
HREF_ATTR = re.compile(
    r"""\bhref\s*=\s*(?P<q>["'])(?P<href>.*?)(?P=q)""",
    re.IGNORECASE,
)


def iter_html_files(root: Path):
    for path in root.rglob("*.html"):
        if any(part in SKIP_DIRS for part in path.relative_to(root).parts):
            continue
        yield path


def file_for_url_path(root: Path, url_path: str) -> Path | None:
    """Return the repo file a URL path corresponds to, or None.

    Accepts the forms already used on the site: /page.html, cleanUrls
    /page, a trailing slash, and / for index.html. Trailing slashes are
    stripped only to find the file; they are not treated as a redirect rule.
    """
    path = unquote(url_path or "/")
    if path.startswith("/"):
        path = path[1:]
    if path.endswith("/"):
        path = path[:-1]

    candidates = []
    if path == "":
        candidates.append(root / "index.html")
    else:
        candidates.append(root / path)
        if not path.endswith(".html"):
            candidates.append(root / f"{path}.html")
            candidates.append(root / path / "index.html")

    for candidate in candidates:
        try:
            candidate.resolve().relative_to(root.resolve())
        except ValueError:
            continue
        if candidate.is_file():
            return candidate
    return None


def canonical_hrefs(html: str) -> list[str]:
    hrefs = []
    for tag in CANONICAL_TAG.findall(html):
        match = HREF_ATTR.search(tag)
        if match:
            hrefs.append(match.group("href").strip())
        else:
            hrefs.append("")
    return hrefs


def canonical_target_file(root: Path, href: str, page: Path) -> Path | None:
    if not href:
        return None
    parsed = urlparse(href)
    if parsed.scheme in {"http", "https"} or href.startswith("//"):
        host = (parsed.netloc or "").lower().split(":")[0]
        if host not in SITE_HOSTS:
            return None
        return file_for_url_path(root, parsed.path or "/")
    if href.startswith("/"):
        return file_for_url_path(root, parsed.path or href)
    # Relative canonical: resolve against the page directory.
    url_path = (page.parent / href.split("?", 1)[0].split("#", 1)[0]).as_posix()
    try:
        rel = Path(url_path).resolve().relative_to(root.resolve()).as_posix()
    except ValueError:
        return None
    return file_for_url_path(root, "/" + rel)


def broken_canonicals(root: Path) -> list[tuple[Path, str]]:
    broken = []
    for page in sorted(iter_html_files(root)):
        text = page.read_text(encoding="utf-8", errors="replace")
        for href in canonical_hrefs(text):
            if canonical_target_file(root, href, page) is None:
                broken.append((page, href))
    return broken


def main() -> int:
    broken = broken_canonicals(ROOT)
    if not broken:
        print(f"OK: every canonical in {ROOT} points at a file in the repo.")
        return 0
    print(f"FAIL: {len(broken)} canonical(s) point at a path with no file:")
    for page, href in broken:
        rel = page.relative_to(ROOT).as_posix()
        shown = href or "(missing href)"
        print(f"  {rel}: {shown}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
