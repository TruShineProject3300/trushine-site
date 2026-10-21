# Far-city drive-time audit

Internal planning note. This is not a service page, it is not linked from the site, and it was not added to sitemap.xml. No page was noindexed, redirected, or deleted.

## Rule

TruShine drops a location only when the drive is more than 3 hours from **both** offices:

- Georgia office: 6500 McDonough Dr, Suite A-4, Norcross, GA 30093
- North Carolina office: 1136 Louise Rd, Ste 115, Winston-Salem, NC 27107

Office points are US Census geocodes of those street addresses. City points are Open-Meteo place matches in the correct state. Two were corrected after a bad first match and retimed: Henrico County (not the small community named Henrico on the North Carolina line) and Madison, Alabama city hall (not Madison County).

Drive times are OSRM car routes from `router.project-osrm.org` (free-flow, no live traffic). The CSV column `estimate_minutes_at_60mph` is a separate **estimate**: the same OSRM road miles divided by 60 mph. OSRM itself averaged about 50 to 55 mph, so it runs longer than a typical interstate maps estimate. Use the OSRM time for the classification. Use the 60 mph column only as a sensitivity check before deleting a city close to the line.

## Scope

Sitemap city URLs audited: hood-cleaning (122) and deep-cleaning (120). Unique cities in that set: 122. Hood-only extras with no deep page: Clarkston, GA and Stone Mountain, GA. Both are inside the 3-hour rule and are not in the tables below.

Other sitemap service prefixes that repeat the same city pattern, not changed here:

- `fire-suppression-*`: 120 URLs
- `grease-trap-*`: 120 URLs
- `drain-jetting-*`: 35 URLs
- `janitorial-*`: 35 URLs
- `pressure-washing-*`: 35 URLs
- `uco-management-*`: 35 URLs

The CSV column `sibling_prefixes` lists which of those exist for each far or borderline city. The same drive time applies. This audit did not edit them.

## How a row was classified

- **Far:** both drives are over 3:00, and the shorter one is more than 15 minutes over 3:00. Proposal: removal with a 301.
- **Borderline, both over:** both drives are over 3:00, and the shorter one is within 15 minutes of 3:00. Proposal: noindex now, do not delete until a clocked drive confirms it.
- **Borderline, one office under:** the shorter drive is within 15 minutes under 3:00. Proposal: keep. The drop rule does not apply.

Redirect target, used only if the page is later removed:

- Same service prefix on the nearest large served city (population at least 100,000, or a named metro upgrade such as Hixson to Chattanooga) when that drive is within about 3 hours.
- Otherwise the service hub: `/hood-cleaning` or `/deep-cleaning`.
- A city is "served" here when at least one office is at or under 3:00 on the OSRM route. Birmingham, Columbia, and the other both-over borderline cities are not used as redirect targets.

## Borderline (within 15 minutes of 3:00): 9 cities, 18 pages

| City | State | Norcross | Winston-Salem | Nearer | Proposal | Redirect target | Pages |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Greer | SC | 2:45 | 3:12 | 2:45 (Norcross) | keep | keep | [deep-cleaning](https://trushineservice.com/deep-cleaning-greer-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-greer-sc) |
| Spartanburg | SC | 3:03 | 2:54 | 2:54 (Winston-Salem) | keep | keep | [deep-cleaning](https://trushineservice.com/deep-cleaning-spartanburg-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-spartanburg-sc) |
| Trussville | AL | 3:02 | 8:40 | 3:02 (Norcross) | noindex | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-trussville-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-trussville-al) |
| Mountain Brook | AL | 3:03 | 8:42 | 3:03 (Norcross) | noindex | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-mountain-brook-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-mountain-brook-al) |
| Birmingham | AL | 3:06 | 8:45 | 3:06 (Norcross) | noindex | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-birmingham-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-birmingham-al) |
| Homewood | AL | 3:11 | 8:49 | 3:11 (Norcross) | noindex | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-homewood-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-homewood-al) |
| Hoover | AL | 3:13 | 8:52 | 3:13 (Norcross) | noindex | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-hoover-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-hoover-al) |
| Vestavia Hills | AL | 3:13 | 8:51 | 3:13 (Norcross) | noindex | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-vestavia-hills-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-vestavia-hills-al) |
| Columbia | SC | 4:06 | 3:14 | 3:14 (Winston-Salem) | noindex | /deep-cleaning-charlotte-nc and /hood-cleaning-charlotte-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-columbia-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-columbia-sc) |

## Far (both offices over 3:00 by more than 15 minutes): 55 cities, 110 pages

| City | State | Norcross | Winston-Salem | Nearer | Proposal | Redirect target | Pages |
| --- | --- | --- | --- | --- | --- | --- | --- |
| West Columbia | SC | 4:03 | 3:17 | 3:17 (Winston-Salem) | removal-with-301 | /deep-cleaning-charlotte-nc and /hood-cleaning-charlotte-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-west-columbia-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-west-columbia-sc) |
| Pelham | AL | 3:19 | 8:58 | 3:19 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-pelham-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-pelham-al) |
| Montgomery | AL | 3:20 | 8:59 | 3:20 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-montgomery-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-montgomery-al) |
| Gardendale | AL | 3:22 | 9:01 | 3:22 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-gardendale-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-gardendale-al) |
| Alabaster | AL | 3:23 | 9:02 | 3:23 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-alabaster-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-alabaster-al) |
| Irmo | SC | 4:00 | 3:27 | 3:27 (Winston-Salem) | removal-with-301 | /deep-cleaning-greenville-sc and /hood-cleaning-greenville-sc | [deep-cleaning](https://trushineservice.com/deep-cleaning-irmo-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-irmo-sc) |
| Lexington | SC | 3:51 | 3:29 | 3:29 (Winston-Salem) | removal-with-301 | /deep-cleaning-greenville-sc and /hood-cleaning-greenville-sc | [deep-cleaning](https://trushineservice.com/deep-cleaning-lexington-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-lexington-sc) |
| Prattville | AL | 3:38 | 9:17 | 3:38 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-prattville-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-prattville-al) |
| Farragut | TN | 3:49 | 5:19 | 3:49 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-farragut-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-farragut-tn) |
| Maryville | TN | 3:52 | 5:20 | 3:52 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-maryville-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-maryville-tn) |
| Colonial Heights | VA | 9:21 | 3:57 | 3:57 (Winston-Salem) | removal-with-301 | /deep-cleaning-durham-nc and /hood-cleaning-durham-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-colonial-heights-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-colonial-heights-va) |
| Huntsville | AL | 4:03 | 9:00 | 4:03 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-huntsville-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-huntsville-al) |
| Knoxville | TN | 4:04 | 5:02 | 4:04 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-knoxville-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-knoxville-tn) |
| Chester | VA | 9:31 | 4:06 | 4:06 (Winston-Salem) | removal-with-301 | /deep-cleaning-durham-nc and /hood-cleaning-durham-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-chester-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-chester-va) |
| Chesterfield | VA | 9:37 | 4:12 | 4:12 (Winston-Salem) | removal-with-301 | /deep-cleaning-durham-nc and /hood-cleaning-durham-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-chesterfield-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-chesterfield-va) |
| Murfreesboro | TN | 4:13 | 8:19 | 4:13 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-murfreesboro-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-murfreesboro-tn) |
| Madison | AL | 4:16 | 9:13 | 4:16 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-madison-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-madison-al) |
| Midlothian | VA | 9:48 | 4:19 | 4:19 (Winston-Salem) | removal-with-301 | /deep-cleaning-durham-nc and /hood-cleaning-durham-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-midlothian-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-midlothian-va) |
| Henrico | VA | 9:45 | 4:20 | 4:20 (Winston-Salem) | removal-with-301 | /deep-cleaning-durham-nc and /hood-cleaning-durham-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-henrico-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-henrico-va) |
| Richmond | VA | 9:47 | 4:22 | 4:22 (Winston-Salem) | removal-with-301 | /deep-cleaning-durham-nc and /hood-cleaning-durham-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-richmond-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-richmond-va) |
| Mechanicsville | VA | 9:53 | 4:29 | 4:29 (Winston-Salem) | removal-with-301 | /deep-cleaning-durham-nc and /hood-cleaning-durham-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-mechanicsville-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-mechanicsville-va) |
| Smyrna | TN | 4:30 | 8:13 | 4:30 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-smyrna-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-smyrna-tn) |
| Decatur | AL | 4:31 | 9:28 | 4:31 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-decatur-al), [hood-cleaning](https://trushineservice.com/hood-cleaning-decatur-al) |
| Ashland | VA | 10:07 | 4:43 | 4:43 (Winston-Salem) | removal-with-301 | /deep-cleaning-durham-nc and /hood-cleaning-durham-nc | [deep-cleaning](https://trushineservice.com/deep-cleaning-ashland-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-ashland-va) |
| Brentwood | TN | 4:46 | 8:22 | 4:46 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-brentwood-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-brentwood-tn) |
| Franklin | TN | 4:50 | 8:34 | 4:50 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-franklin-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-franklin-tn) |
| Nashville | TN | 4:50 | 8:18 | 4:50 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-nashville-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-nashville-tn) |
| Mount Juliet | TN | 4:52 | 7:59 | 4:52 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-mount-juliet-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-mount-juliet-tn) |
| Summerville | SC | 5:34 | 4:58 | 4:58 (Winston-Salem) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-summerville-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-summerville-sc) |
| Gallatin | TN | 5:03 | 8:10 | 5:03 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-gallatin-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-gallatin-tn) |
| Goose Creek | SC | 5:43 | 5:06 | 5:06 (Winston-Salem) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-goose-creek-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-goose-creek-sc) |
| Hendersonville | TN | 5:07 | 8:26 | 5:07 (Norcross) | removal-with-301 | /deep-cleaning-chattanooga-tn and /hood-cleaning-chattanooga-tn | [deep-cleaning](https://trushineservice.com/deep-cleaning-hendersonville-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-hendersonville-tn) |
| North Charleston | SC | 5:52 | 5:16 | 5:16 (Winston-Salem) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-north-charleston-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-north-charleston-sc) |
| Charleston | SC | 6:01 | 5:25 | 5:25 (Winston-Salem) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-charleston-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-charleston-sc) |
| Fredericksburg | VA | 10:52 | 5:27 | 5:27 (Winston-Salem) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-fredericksburg-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-fredericksburg-va) |
| Mount Pleasant | SC | 6:06 | 5:30 | 5:30 (Winston-Salem) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-mount-pleasant-sc), [hood-cleaning](https://trushineservice.com/hood-cleaning-mount-pleasant-sc) |
| Clarksville | TN | 5:42 | 9:10 | 5:42 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-clarksville-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-clarksville-tn) |
| Virginia Beach | VA | 11:06 | 5:42 | 5:42 (Winston-Salem) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-virginia-beach-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-virginia-beach-va) |
| Woodbridge | VA | 11:22 | 5:57 | 5:57 (Winston-Salem) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-woodbridge-va), [hood-cleaning](https://trushineservice.com/hood-cleaning-woodbridge-va) |
| Jacksonville | FL | 6:35 | 8:30 | 6:35 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-jacksonville-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-jacksonville-fl) |
| Orange Park | FL | 6:42 | 8:51 | 6:42 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-orange-park-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-orange-park-fl) |
| Fleming Island | FL | 6:53 | 9:02 | 6:53 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-fleming-island-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-fleming-island-fl) |
| Ponte Vedra Beach | FL | 7:04 | 8:56 | 7:04 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-ponte-vedra-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-ponte-vedra-fl) |
| Jacksonville Beach | FL | 7:05 | 8:52 | 7:05 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-jacksonville-beach-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-jacksonville-beach-fl) |
| St. Augustine | FL | 7:22 | 9:19 | 7:22 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-st-augustine-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-st-augustine-fl) |
| Memphis | TN | 7:28 | 12:07 | 7:28 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-memphis-tn), [hood-cleaning](https://trushineservice.com/hood-cleaning-memphis-tn) |
| Orlando | FL | 8:14 | 11:08 | 8:14 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-orlando-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-orlando-fl) |
| Winter Park | FL | 8:24 | 11:08 | 8:24 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-winter-park-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-winter-park-fl) |
| Kissimmee | FL | 8:25 | 11:34 | 8:25 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-kissimmee-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-kissimmee-fl) |
| Altamonte Springs | FL | 8:26 | 10:59 | 8:26 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-altamonte-springs-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-altamonte-springs-fl) |
| Tampa | FL | 8:33 | 12:22 | 8:33 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-tampa-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-tampa-fl) |
| Brandon | FL | 8:35 | 12:24 | 8:35 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-brandon-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-brandon-fl) |
| Lake Mary | FL | 8:37 | 10:52 | 8:37 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-lake-mary-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-lake-mary-fl) |
| Sanford | FL | 8:37 | 10:50 | 8:37 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-sanford-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-sanford-fl) |
| Clearwater | FL | 9:06 | 12:55 | 9:06 (Norcross) | removal-with-301 | /deep-cleaning and /hood-cleaning | [deep-cleaning](https://trushineservice.com/deep-cleaning-clearwater-fl), [hood-cleaning](https://trushineservice.com/hood-cleaning-clearwater-fl) |

## Closest cities that still pass the rule

Shorter drive, for context only. These pages stay.

| City | State | Norcross | Winston-Salem | Shorter |
| --- | --- | --- | --- | --- |
| Taylors | SC | 2:41 | 3:20 | 2:41 |
| Simpsonville | SC | 2:36 | 3:28 | 2:36 |
| Mauldin | SC | 2:31 | 3:24 | 2:31 |
| Fayetteville | NC | 7:04 | 2:28 | 2:28 |
| Greenville | SC | 2:27 | 3:24 | 2:27 |
| Hixson | TN | 2:27 | 7:02 | 2:27 |
| Chattanooga | TN | 2:20 | 7:05 | 2:20 |
| Raleigh | NC | 7:29 | 2:04 | 2:04 |

## What was not done

No `noindex` was added. No city file was deleted. No redirect was added to `vercel.json`. Sitemap.xml was not edited.

Full row-level detail, including road miles, the 60 mph estimate, sibling prefixes, and notes, is in `docs/far-city-drive-time-audit.csv`.
