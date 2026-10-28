# Landing pages for the Google Ads search test

This pull request does not build new ad landing pages. These existing URLs can carry the test. Above-the-fold changes below are a proposal for a later pass. Do not add prices. Do not add client or venue names.

The existing rewrite in `vercel.json` already maps an extensionless path to the matching `.html` file. `cleanUrls` stays false, and this plan does not change routes.

## Atlanta hood cleaning quote

Use [hood-cleaning-atlanta-ga.html](../../hood-cleaning-atlanta-ga.html), served at `/hood-cleaning-atlanta-ga`.

- Branch `atl-001`. The number already on the page is (678) 751-8871.
- Form embed id `dPdE5irmCkay76sedBDl` (do not replace it).
- The page already says it does not publish a flat price.

Above the fold today: the H1 "Hood Cleaning and Kitchen Exhaust Cleaning in Atlanta, GA", a free-assessment link, and a Call (678) 751-8871 button. The GoHighLevel form is an 884px iframe at the bottom of the page.

Later, if a shorter quote form is wanted in the hero:

- Build that short form in GoHighLevel as a new form. Do not change the id on the existing embed.
- Keep tap-to-call on (678) 751-8871.
- Leave prices and client or venue names off the page.

## Charlotte hood cleaning quote

Use [hood-cleaning-charlotte-nc.html](../../hood-cleaning-charlotte-nc.html), served at `/hood-cleaning-charlotte-nc`.

- Branch `car-001`. The number already on the page is (704) 970-7290.
- Same form id, `dPdE5irmCkay76sedBDl`.
- Same layout idea as the Charlotte deep-cleaning page: H1, free assessment, and Call (704) 970-7290 above the fold, with the tall form iframe lower on the page.

A later hero pass would add a short form beside that call button, using a new GoHighLevel form id, and would still not publish a price or a client name.

## Carolinas commercial kitchen deep cleaning

There is no single Carolinas URL. The best existing page for one Carolinas search ad is [deep-cleaning-charlotte-nc.html](../../deep-cleaning-charlotte-nc.html), served at `/deep-cleaning-charlotte-nc`.

- Branch `car-001` and (704) 970-7290, which is the Carolinas and Virginia line.
- The H1 is Charlotte-specific: "Commercial Kitchen Deep Cleaning in Charlotte, NC".
- The hero already has a free-assessment link and Call (704) 970-7290. The form iframe sits below the fold and is 884px tall.

Use this URL as-is for a Charlotte deep-cleaning ad. If one ad group must cover North Carolina and South Carolina, a later pull request can change only the hero headline to Carolinas and keep this phone number and branch. City pages that already exist for a split test include `/deep-cleaning-raleigh-nc`, `/deep-cleaning-durham-nc`, `/deep-cleaning-greenville-sc`, and `/deep-cleaning-simpsonville-sc`.

`/solutions/deep-cleaning` is a service overview. It is not a Carolinas page, and it is classified `atl-001` with `page_type: general`, so it is a weaker landing URL for this test.

## Names and prices already on these pages

Searched the homepage and the candidate pages for stadium, arena, Mercedes-Benz, Truist, State Farm, Cook Out, Delaware North, Levy, Taziki, Talpa, Peach Bowl, "71,000-seat", and "Largest Venues", and for dollar amounts.

Named clients and venues from that list do not appear anywhere in the HTML. The homepage uses generic wording only ("major stadiums", "Major NFL stadium", "Major arena", "Major league ballpark", "Major event venue"). Those phrases are not on the Atlanta, Charlotte, or Raleigh hood pages, and they are not on the Charlotte deep-cleaning page.

Dollar amounts: the Atlanta, Charlotte, and Raleigh hood pages and the Charlotte deep-cleaning page do not publish a price. The Atlanta hood page says it does not publish a flat price. The homepage, `atlanta.html`, and `charlotte.html` include a quiz line about municipal fines ("$500 to $5,000") inside a script. That line is not a TruShine service price, and it is not on the candidate hood or deep-cleaning pages.
