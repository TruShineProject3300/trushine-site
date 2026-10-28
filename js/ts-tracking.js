/*
 * TruShine site tracking. Loaded with defer on pages that embed a
 * GoHighLevel form or the LeadConnector chat widget, and on pages
 * with the mobile Call Now button.
 *
 * NO PII: never push a name, email, phone number, or message text to
 * dataLayer. utm_* and gclid are stored for GHL hidden-field prefill
 * only. They are not pushed to dataLayer.
 *
 * Form success (read from the production form app
 * https://stcdn.leadconnectorhq.com/_preview/cuexcqRf.js on 2026-10-28,
 * the script the live api.leadconnectorhq.com form iframe loads):
 * after submitRequest resolves, helper gd posts two parent messages:
 *   ["set-sticky-contacts", "_ud", JSON.stringify(contact), locationId, fingerprint]
 *   ["set-sticky-contacts", "embedded_iframe_<iframeId>", iframeId, locationId, fingerprint]
 * The embedded_iframe_ message is sent only on that success path.
 * The sticky-sync helper P1 posts only the _ud message, and that JSON
 * holds contact fields. isConfirmedGhlFormSuccess accepts ONLY the
 * embedded_iframe_ message and never reads the _ud JSON.
 * This was confirmed by reading the bundle, not by submitting a live
 * form. ?ts_debug=1 logs message shape (contact values redacted).
 *
 * Chat: beta.leadconnectorhq.com/chat-widget/p-bf4c51ad.entry.js
 * dispatches window event "lc-widget-opened" from postOpenWidget when
 * the bubble opens. That is chat_start. The same bundle sets an
 * internal requestState to COMPLETED after a successful widget submit
 * and does not dispatch a parent event or postMessage for the captured
 * phone or email. chat_lead is not emitted. Configure that inside GHL.
 */
(function () {
  "use strict";
  try {
    var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
    var STORE_KEY = "ts_ft_v1";
    var MAX_AGE = 90 * 24 * 60 * 60 * 1000;
    var recentSubmit = Object.create(null);
    var lastChatStart = 0;
    var debug = false;
    try {
      debug = /(?:^|[?&])ts_debug=1(?:&|$)/.test(window.location.search);
    } catch (err) {
      debug = false;
    }

    function pageBranch() {
      try {
        var dl = window.dataLayer || [];
        var i;
        for (i = dl.length - 1; i >= 0; i--) {
          if (dl[i] && (dl[i].branch === "atl-001" || dl[i].branch === "car-001")) {
            return dl[i].branch;
          }
        }
      } catch (err) {}
      return "atl-001";
    }

    function pushEvent(payload) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    }

    /*
     * Custom HTML form submits.
     * Widget form URLs (api.leadconnectorhq.com/widget/form/...) did not
     * return Access-Control-Allow-Origin on OPTIONS or GET for
     * Origin https://trushineservice.com (checked 2026-10-28, no lead
     * posted). Those calls stay mode no-cors so lead delivery is unchanged.
     * A push after that promise resolves is a sent signal, not a confirmed
     * server success. lead_confirm is "opaque".
     * The webhook URL (services.leadconnectorhq.com/hooks/...) answered
     * OPTIONS with Access-Control-Allow-Origin: *. Those calls already use
     * cors. Callers pass lead_confirm "http-ok" only when response.ok.
     * guard is a dedupe key only. It is never pushed. No PII is pushed.
     */
    var recentCustom = Object.create(null);
    function formSubmit(opts) {
      try {
        var formId;
        var leadConfirm;
        var guard;
        var now;
        if (!opts || typeof opts !== "object") return;
        formId = typeof opts.form_id === "string" ? opts.form_id : "";
        if (!/^[A-Za-z0-9_-]{1,64}$/.test(formId)) return;
        leadConfirm = opts.lead_confirm === "http-ok" ? "http-ok" : "opaque";
        guard = typeof opts.guard === "string" && /^[a-z0-9-]{1,40}$/.test(opts.guard) ? opts.guard : "form";
        now = Date.now();
        guard = formId + "|" + guard + "|" + leadConfirm;
        if (recentCustom[guard] && now - recentCustom[guard] < 4000) return;
        recentCustom[guard] = now;
        pushEvent({
          event: "ghl_form_submit",
          form_id: formId,
          branch: pageBranch(),
          lead_channel: "web-form",
          lead_confirm: leadConfirm
        });
      } catch (err) {}
    }
    window.tsTrack = { formSubmit: formSubmit };

    function allowedOrigin(origin) {
      var host;
      var roots = ["leadconnectorhq.com", "msgsndr.com", "trushineservice.com"];
      var i;
      if (!origin) return false;
      try {
        host = new URL(origin).hostname.toLowerCase();
      } catch (err) {
        return false;
      }
      for (i = 0; i < roots.length; i++) {
        if (host === roots[i] || host.slice(-(roots[i].length + 1)) === "." + roots[i]) return true;
      }
      return false;
    }

    /* Confirmed GHL form success. See file header. */
    function isConfirmedGhlFormSuccess(data) {
      var key;
      if (!data || Object.prototype.toString.call(data) !== "[object Array]") return false;
      if (data[0] !== "set-sticky-contacts") return false;
      key = data[1];
      return typeof key === "string" && key.indexOf("embedded_iframe_") === 0;
    }

    function formIdFromSource(source) {
      var frames;
      var i;
      var id;
      var src;
      var match;
      if (!source) return "";
      try {
        frames = document.querySelectorAll("iframe");
      } catch (err) {
        return "";
      }
      for (i = 0; i < frames.length; i++) {
        try {
          if (frames[i].contentWindow !== source) continue;
          id = frames[i].getAttribute("data-form-id") || "";
          if (id) return id;
          src = frames[i].getAttribute("src") || "";
          match = src.match(/\/widget\/form\/([A-Za-z0-9]+)/);
          return match ? match[1] : "";
        } catch (err) {}
      }
      return "";
    }

    function debugShape(data) {
      var key;
      var second;
      var parsed;
      if (Object.prototype.toString.call(data) === "[object Array]") {
        second = data[2];
        if (data[1] === "_ud" && typeof second === "string") {
          try {
            parsed = JSON.parse(second);
            return {
              kind: "array",
              action: data[0],
              key: data[1],
              payload: "redacted",
              keys: parsed && typeof parsed === "object" ? Object.keys(parsed) : []
            };
          } catch (err) {
            return { kind: "array", action: data[0], key: data[1], payload: "redacted-unparsed" };
          }
        }
        return {
          kind: "array",
          action: data[0],
          key: data[1],
          secondType: typeof second,
          second: typeof second === "string" && second.length < 80 ? second : undefined
        };
      }
      if (data && typeof data === "object") {
        key = [];
        try { key = Object.keys(data).slice(0, 12); } catch (err) {}
        return { kind: "object", keys: key };
      }
      return { kind: typeof data, value: typeof data === "string" ? String(data).slice(0, 80) : undefined };
    }

    function onMessage(event) {
      var formId;
      var now;
      try {
        if (!allowedOrigin(event.origin)) return;
        if (debug) {
          console.log("[ts-tracking] iframe message", event.origin, debugShape(event.data));
        }
        if (!isConfirmedGhlFormSuccess(event.data)) return;
        formId = formIdFromSource(event.source) || "unknown";
        now = Date.now();
        if (recentSubmit[formId] && now - recentSubmit[formId] < 5000) return;
        recentSubmit[formId] = now;
        pushEvent({
          event: "ghl_form_submit",
          form_id: formId,
          branch: pageBranch(),
          lead_channel: "web-form"
        });
      } catch (err) {}
    }

    function linkLocation(anchor) {
      try {
        if (anchor.closest("[data-track='sticky-call'], .ts-sticky-call")) return "sticky";
        if (anchor.closest("header, nav, .nav, .nv, .mob, .mob-call, .mob-bar, .header, .nav-r, .nv-r")) return "header";
      } catch (err) {}
      return "body";
    }

    function onClick(event) {
      var anchor;
      try {
        anchor = event.target && event.target.closest ? event.target.closest("a[href^='tel:']") : null;
        if (!anchor) return;
        pushEvent({
          event: "phone_click",
          branch: pageBranch(),
          link_location: linkLocation(anchor)
        });
      } catch (err) {}
    }

    function onChatOpen() {
      var now;
      try {
        now = Date.now();
        if (now - lastChatStart < 800) return;
        lastChatStart = now;
        if (debug) console.log("[ts-tracking] lc-widget-opened");
        pushEvent({
          event: "chat_start",
          branch: pageBranch(),
          lead_channel: "chat"
        });
      } catch (err) {}
    }

    function cleanParam(value) {
      if (typeof value !== "string") return "";
      value = value.replace(/[\u0000-\u001f\u007f]/g, "").trim();
      if (value.length > 200) value = value.slice(0, 200);
      return value;
    }

    function readCookie(name) {
      var parts;
      var i;
      var bit;
      try {
        parts = document.cookie ? document.cookie.split("; ") : [];
        for (i = 0; i < parts.length; i++) {
          bit = parts[i];
          if (bit.indexOf(name + "=") === 0) return decodeURIComponent(bit.slice(name.length + 1));
        }
      } catch (err) {}
      return "";
    }

    function readTouch() {
      var raw = "";
      var obj;
      try { raw = window.localStorage.getItem(STORE_KEY) || ""; } catch (err) {}
      if (!raw) raw = readCookie(STORE_KEY);
      if (!raw) return null;
      try {
        obj = JSON.parse(raw);
      } catch (err) {
        return null;
      }
      if (!obj || !obj.t || Date.now() - obj.t > MAX_AGE) return null;
      return obj;
    }

    function writeTouch(obj) {
      var raw = JSON.stringify(obj);
      var exp;
      var secure = "";
      try { window.localStorage.setItem(STORE_KEY, raw); } catch (err) {}
      try {
        exp = new Date(Date.now() + MAX_AGE).toUTCString();
        if (window.location.protocol === "https:") secure = "; Secure";
        document.cookie = STORE_KEY + "=" + encodeURIComponent(raw) + "; expires=" + exp + "; path=/; SameSite=Lax" + secure;
      } catch (err) {}
    }

    function captureTouch() {
      var existing;
      var params;
      var data;
      var i;
      var value;
      var found = false;
      try {
        existing = readTouch();
        if (existing) return existing;
        params = new URLSearchParams(window.location.search);
        data = { t: Date.now(), landing_page: window.location.pathname || "/" };
        for (i = 0; i < UTM_KEYS.length; i++) {
          value = cleanParam(params.get(UTM_KEYS[i]) || "");
          if (value) {
            data[UTM_KEYS[i]] = value;
            found = true;
          }
        }
        if (!found) return null;
        writeTouch(data);
        return data;
      } catch (err) {
        return null;
      }
    }

    function decorateForms(touch) {
      var frames;
      var i;
      var src;
      var url;
      var keys;
      var k;
      var changed;
      if (!touch) return;
      try {
        frames = document.querySelectorAll("iframe[src*='leadconnectorhq.com/widget/form'], iframe[src*='msgsndr.com/widget/form']");
      } catch (err) {
        return;
      }
      keys = UTM_KEYS.concat(["landing_page"]);
      for (i = 0; i < frames.length; i++) {
        try {
          src = frames[i].getAttribute("src");
          if (!src) continue;
          url = new URL(src, window.location.href);
          changed = false;
          for (k = 0; k < keys.length; k++) {
            if (touch[keys[k]] && !url.searchParams.get(keys[k])) {
              url.searchParams.set(keys[k], touch[keys[k]]);
              changed = true;
            }
          }
          if (changed) frames[i].setAttribute("src", url.toString());
        } catch (err) {}
      }
    }

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    window.addEventListener("lc-widget-opened", onChatOpen);
    decorateForms(captureTouch());
  } catch (err) {}
})();
