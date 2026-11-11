# Local landing page batch plan

Carlos approved a local-page batch for cities inside a real drive of either TruShine office. This file is the working list for that batch. It is a draft for review. It does not change live routing, and it does not deploy.

Granola was not signed in for this session, so meeting notes were not pulled. The scope below is the approved brief: both offices, a real drive time, four kitchen services, and no pest control.

## Offices

| Branch | Address | States on this phone |
| --- | --- | --- |
| ATL-001 | 6500 McDonough Dr, Suite A-4, Norcross, GA 30093 | Georgia, Alabama, Tennessee: (678) 751-8871 |
| CAR-001 | 1136 Louise Rd, Ste 115, Winston-Salem, NC 27107 | North Carolina, South Carolina, Virginia: (704) 970-7290 |

Coordinates used for routing are the Census geocoder matches for those street addresses: Norcross 33.90767, -84.21441 and Winston-Salem 36.05549, -80.21160. The nearest branch is the office with the shorter OSRM drive. The phone follows the state table above. In this set, the nearest office and the state phone agree for every city.

## Drive time

Drive times are from the public OSRM driving profile (`router.project-osrm.org`) on 22 October 2026. That profile is slow on these corridors, about 50 to 55 mph. Augusta is 150 miles and 2.9 hours from Norcross. Charlotte is 227 miles and 4.4 hours from Norcross, and 1.6 hours from Winston-Salem.

Because OSRM runs slow, a result up to about 3:20 is treated as in range:

- **in**: OSRM duration from the nearer office is 3:00 or less.
- **verify**: OSRM duration is over 3:00 and up to 3:21. Montgomery, Alabama returned 3:20:30, which is inside that approximate 3:20 edge and is marked verify. Confirm these routes before a crew promises a tight window.
- **out**: over 3:21. Those cities are not in the batch table. The largest ones just outside the window are listed at the end.

A straight-line prefilter of 210 miles was applied before OSRM. Anything farther than that is a longer road distance, so it cannot finish inside 3:21 at OSRM speeds. Savannah (about 4.9 hours from Norcross) and Nashville (about 4.8 hours) were checked directly and are out.

## Who is on the list

Incorporated cities and towns with a Census population estimate of at least 18,000 for 1 July 2024. Eighteen thousand is the working line for roughly 20,000. It keeps Norcross (18,902) and leaves out mid-teens suburbs such as Loganville (16,862).

Consolidated governments use the Census balance name and a normal city slug: Athens-Clarke County is Athens, Augusta-Richmond County is Augusta, Macon-Bibb County is Macon, Nashville-Davidson is Nashville (Nashville is outside the drive window).

Census designated places of about 20,000 or more are included when they function as the local search name. Their population is the 2020 Census count, not the 2024 city estimate. Examples inside the window: Evans and Martinez (Columbia County, Georgia), Redan, Candler-McAfee, North Druid Hills, and North Decatur.

Named restaurant hubs under 18,000 are included when the drive is in range. They are priority tier P5 and sort after the larger cities.

County restaurant context is Census County Business Patterns 2023, NAICS 722 (food services and drinking places), establishment count. For a city in more than one county, the table uses the higher county count, not a sum. That number describes the county, not a TruShine client list, and it does not outrank population. Biggest markets are still sorted by population.

## Services and URLs

Four services. Pest control is not in this plan.

| Service | New-page slug | Counts as already published |
| --- | --- | --- |
| Hood / exhaust cleaning | `/hood-cleaning-{city}-{st}` | `hood-cleaning-` or `kitchen-exhaust-cleaning-` |
| Grease trap cleaning | `/grease-trap-cleaning-{city}-{st}` | `grease-trap-cleaning-` or `grease-trap-` |
| Used cooking oil recycling | `/used-cooking-oil-recycling-{city}-{st}` | `used-cooking-oil-recycling-` or `uco-management-` |
| Commercial kitchen deep cleaning | `/deep-cleaning-{city}-{st}` | `deep-cleaning-` |

If a city already has the older slug, the row is an improvement, not a second URL. Atlanta already has both `grease-trap-atlanta-ga` and `grease-trap-cleaning-atlanta-ga`. That row points at the existing `grease-trap-cleaning` URL and does not call for another page. New cities use the longer slug, matching the flagship pattern of `/hood-cleaning-atlanta-ga`.

Priority tiers: P1 is 150,000 or more. P2 is 70,000 to 149,999. P3 is 35,000 to 69,999. P4 is 18,000 to 34,999. P5 is a named restaurant hub under 18,000. Inside a city, the service order is hood, grease trap, used oil, then deep cleaning.

## Totals

- Cities and towns in range, including verify: **171**
- Of those, verify (3:00 to about 3:20): **16**
- Named hubs included under 18,000 population: **16**
- City and service combinations: **684** (171 x 4)
- Already published (improve, do not duplicate): **198**
- New pages still to build: **486**
- Cities with all 4 services already published: **24**
- Cities with some services published: **34**
- Cities with no service page yet: **113**
- New-page batches: **13**
- Improvement batches, counted separately: **5**

New batches are 25 to 50 pages, largest populations first. Batch new-1 is the 25 pages in this pull request. Improvement batches are the same size rule and are not built here. Many existing files are thin templates. The quality bar for a later rewrite is `hood-cleaning-atlanta-ga.html`, without copying that page's code-section citations onto other cities.

## New-page batches

| Batch | Pages | Built now | First city | Last city |
| --- | ---: | --- | --- | --- |
| new-1 | 25 | yes | Fayetteville, NC (uco) | South Fulton, GA (grease) |
| new-2 | 40 | no | South Fulton, GA (uco) | Stonecrest, GA (uco) |
| new-3 | 40 | no | Stonecrest, GA (deep) | Hickory, NC (grease) |
| new-4 | 40 | no | Hickory, NC (uco) | Rome, GA (uco) |
| new-5 | 40 | no | Rome, GA (deep) | Martinez, GA (hood) |
| new-6 | 40 | no | Martinez, GA (grease) | Mauldin, SC (uco) |
| new-7 | 40 | no | Mint Hill, NC (uco) | Cave Spring, VA (deep) |
| new-8 | 40 | no | North Augusta, SC (hood) | Clemmons, NC (hood) |
| new-9 | 40 | no | Clemmons, NC (grease) | Mebane, NC (deep) |
| new-10 | 40 | no | Winder, GA (hood) | Calhoun, GA (uco) |
| new-11 | 40 | no | Calhoun, GA (deep) | Southern Pines, NC (uco) |
| new-12 | 31 | no | Southern Pines, NC (deep) | Madison, GA (grease) |
| new-13 | 30 | no | Madison, GA (uco) | Helen, GA (deep) |

## Improvement batches

These rows already have a URL. Do not add a second slug. A later pass can rewrite them to the flagship standard.

| Batch | Pages | First city | Last city |
| --- | ---: | --- | --- |
| improve-1 | 40 | Charlotte, NC (hood) | Cary, NC (hood) |
| improve-2 | 40 | Cary, NC (grease) | Chapel Hill, NC (hood) |
| improve-3 | 40 | Chapel Hill, NC (grease) | East Point, GA (grease) |
| improve-4 | 40 | East Point, GA (deep) | Simpsonville, SC (grease) |
| improve-5 | 38 | Simpsonville, SC (deep) | Buford, GA (deep) |

## Batch new-1 (built in this pull request)

| # | Page | City | Drive | Branch | Phone |
| ---: | --- | --- | --- | --- | --- |
| 1 | `/used-cooking-oil-recycling-fayetteville-nc` | Fayetteville, NC (209,496) | in 148.3 min | CAR-001 | (704) 970-7290 |
| 2 | `/hood-cleaning-columbus-ga` | Columbus, GA (201,830) | in 150.2 min | ATL-001 | (678) 751-8871 |
| 3 | `/grease-trap-cleaning-columbus-ga` | Columbus, GA (201,830) | in 150.2 min | ATL-001 | (678) 751-8871 |
| 4 | `/used-cooking-oil-recycling-columbus-ga` | Columbus, GA (201,830) | in 150.2 min | ATL-001 | (678) 751-8871 |
| 5 | `/deep-cleaning-columbus-ga` | Columbus, GA (201,830) | in 150.2 min | ATL-001 | (678) 751-8871 |
| 6 | `/hood-cleaning-augusta-ga` | Augusta, GA (201,737) | verify 181.9 min | ATL-001 | (678) 751-8871 |
| 7 | `/grease-trap-cleaning-augusta-ga` | Augusta, GA (201,737) | verify 181.9 min | ATL-001 | (678) 751-8871 |
| 8 | `/used-cooking-oil-recycling-augusta-ga` | Augusta, GA (201,737) | verify 181.9 min | ATL-001 | (678) 751-8871 |
| 9 | `/deep-cleaning-augusta-ga` | Augusta, GA (201,737) | verify 181.9 min | ATL-001 | (678) 751-8871 |
| 10 | `/used-cooking-oil-recycling-cary-nc` | Cary, NC (182,659) | in 118.3 min | CAR-001 | (704) 970-7290 |
| 11 | `/hood-cleaning-macon-ga` | Macon, GA (157,056) | in 116.1 min | ATL-001 | (678) 751-8871 |
| 12 | `/grease-trap-cleaning-macon-ga` | Macon, GA (157,056) | in 116.1 min | ATL-001 | (678) 751-8871 |
| 13 | `/used-cooking-oil-recycling-macon-ga` | Macon, GA (157,056) | in 116.1 min | ATL-001 | (678) 751-8871 |
| 14 | `/deep-cleaning-macon-ga` | Macon, GA (157,056) | in 116.1 min | ATL-001 | (678) 751-8871 |
| 15 | `/hood-cleaning-athens-ga` | Athens, GA (128,691) | in 71.3 min | ATL-001 | (678) 751-8871 |
| 16 | `/grease-trap-cleaning-athens-ga` | Athens, GA (128,691) | in 71.3 min | ATL-001 | (678) 751-8871 |
| 17 | `/used-cooking-oil-recycling-athens-ga` | Athens, GA (128,691) | in 71.3 min | ATL-001 | (678) 751-8871 |
| 18 | `/deep-cleaning-athens-ga` | Athens, GA (128,691) | in 71.3 min | ATL-001 | (678) 751-8871 |
| 19 | `/hood-cleaning-high-point-nc` | High Point, NC (118,601) | in 20.2 min | CAR-001 | (704) 970-7290 |
| 20 | `/grease-trap-cleaning-high-point-nc` | High Point, NC (118,601) | in 20.2 min | CAR-001 | (704) 970-7290 |
| 21 | `/used-cooking-oil-recycling-high-point-nc` | High Point, NC (118,601) | in 20.2 min | CAR-001 | (704) 970-7290 |
| 22 | `/deep-cleaning-high-point-nc` | High Point, NC (118,601) | in 20.2 min | CAR-001 | (704) 970-7290 |
| 23 | `/used-cooking-oil-recycling-concord-nc` | Concord, NC (112,395) | in 69.2 min | CAR-001 | (704) 970-7290 |
| 24 | `/hood-cleaning-south-fulton-ga` | South Fulton, GA (112,003) | in 53.0 min | ATL-001 | (678) 751-8871 |
| 25 | `/grease-trap-cleaning-south-fulton-ga` | South Fulton, GA (112,003) | in 53.0 min | ATL-001 | (678) 751-8871 |

South Fulton used-oil and deep-cleaning pages are the first two rows of new-2. Roanoke, Virginia and Asheville, North Carolina are the next large cities with no service page yet.

## Verify cities

OSRM time from the nearer office is over 3:00 and not more than about 3:20. They stay in the plan. They are not a same-hour dispatch.

| Minutes | Miles | Branch | Population | Place | County food establishments |
| ---: | ---: | --- | ---: | --- | ---: |
| 181.9 | 154.3 | ATL-001 | 201,737 | Augusta, GA | 417 |
| 182.5 | 156.8 | CAR-001 | 54,541 | Rocky Mount, NC | 180 |
| 185.9 | 162.2 | ATL-001 | 21,701 | Mountain Brook, AL | 1446 |
| 186.9 | 165.4 | ATL-001 | 196,357 | Birmingham, AL | 1446 |
| 188.7 | 166.9 | ATL-001 | 38,151 | Vestavia Hills, AL | 1446 |
| 189.7 | 165.7 | ATL-001 | 27,079 | Trussville, AL | 1446 |
| 190.8 | 151.9 | CAR-001 | 34,629 | Goldsboro, NC | 213 |
| 191.0 | 163.5 | CAR-001 | 27,867 | Bristol, TN | 327 |
| 191.1 | 155.2 | CAR-001 | 15,656 | Hendersonville, NC | 205 |
| 192.3 | 157.9 | CAR-001 | 40,923 | Florence, SC | 301 |
| 192.4 | 171.6 | ATL-001 | 93,013 | Hoover, AL | 1446 |
| 192.9 | 150.5 | ATL-001 | 10,709 | Waynesville, NC | 136 |
| 195.0 | 170.7 | ATL-001 | 27,919 | Homewood, AL | 1446 |
| 196.4 | 152.8 | ATL-001 | 7,973 | Brevard, NC | 86 |
| 197.7 | 169.9 | CAR-001 | 20,675 | St. Andrews, SC | 848 |
| 200.5 | 177.2 | ATL-001 | 195,818 | Montgomery, AL | 469 |

## Restaurant hubs under 18,000

| Population | Place | Minutes | Status | Why it is on the list |
| ---: | --- | ---: | --- | --- |
| 16,987 | Southern Pines, NC | 114.2 | in | Moore County dining town in the Pinehurst resort area. |
| 15,656 | Hendersonville, NC | 191.1 | verify | Downtown Hendersonville restaurant main street. City population sits just under 20,000. |
| 10,709 | Waynesville, NC | 192.9 | verify | Haywood County seat and Main Street kitchens. |
| 10,175 | Cumming, GA | 39.9 | in | Forsyth County seat. City limits are small. The commercial kitchen market is the county around the square. |
| 8,960 | Travelers Rest, SC | 164.2 | in | Main Street restaurant hub north of Greenville. |
| 8,572 | Black Mountain, NC | 151.8 | in | Dining town east of Asheville on I-40. |
| 7,973 | Brevard, NC | 196.4 | verify | Transylvania County seat and downtown dining block. |
| 7,830 | Dahlonega, GA | 72.0 | in | Lumpkin County seat and downtown dining square. |
| 5,131 | Madison, GA | 78.7 | in | Morgan County square. Independent dining town on I-20. |
| 3,573 | Greensboro, GA | 97.0 | in | Lake Oconee dining corridor, not the North Carolina city. |
| 2,090 | Clayton, GA | 109.2 | in | Rabun County seat and mountain dining stop. |
| 1,923 | Ellijay, GA | 99.2 | in | Gilmer County seat. Apple-country dining and downtown kitchens. |
| 1,336 | Blowing Rock, NC | 125.8 | in | Seasonal mountain dining town above Boone. |
| 1,246 | Blue Ridge, GA | 117.0 | in | Downtown Blue Ridge restaurant row on the railroad. |
| 1,119 | Highlands, NC | 141.4 | in | Macon County plateau dining town. |
| 630 | Helen, GA | 93.7 | in | Alpine tourist strip in White County. Restaurant kitchens are the local economy. |

## Just outside the window

These are the largest places that failed the drive test at 3:21 or more, up to 4:00, plus a few major markets checked beyond that. They are not batched. Columbia, South Carolina is the first large miss: the city centroid is 3:24 from Winston-Salem, while the St. Andrews CDP on the northwest side is 3:18 and is in the verify list.

| Minutes | Miles | Branch | Population | Place |
| ---: | ---: | --- | ---: | --- |
| 204.0 | 169.3 | CAR-001 | 144,788 | Columbia, SC |
| 206.6 | 181.1 | CAR-001 | 57,109 | Kingsport, TN |
| 209.8 | 145.1 | CAR-001 | 73,635 | Johnson City, TN |
| 213.3 | 184.3 | CAR-001 | 95,138 | Greenville, NC |
| 218.7 | 176.8 | CAR-001 | 42,958 | Sumter, SC |
| 219.2 | 192.4 | ATL-001 | 40,139 | Prattville, AL |
| 227.7 | 197.3 | ATL-001 | 66,705 | Albany, GA |

Also checked and left out, beyond the table above: Knoxville (4:04 from Norcross), Huntsville (4:12), Tuscaloosa (4:11), Nashville (about 4:49), Savannah (about 4:52), Wilmington, North Carolina (4:21), Richmond (4:24), and Myrtle Beach (4:26). Florida pages, Memphis, Virginia Beach, and Charleston, South Carolina are farther and were not added to this plan. Existing pages for those cities were not deleted, noindexed, or redirected.

## How to read the CSV

`docs/local-pages-batch-plan.csv` has one row per city and service. `action` is `new` or `improve`. `batch` is `new-N` or `improve-N`. `built_in_this_pr` is yes only for new-1. `target_url` is the existing URL when a page already exists, and the new slug when it does not. `drive_status` is `in` or `verify`.

