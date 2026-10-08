# Near Me: how the metabolic infrastructure map is built

Version 2 · United States · rendered at [/near-me/methodology](https://skinoversteel.com/near-me/methodology)

## What it is

A map of **businesses** that treat, supply, or support men's metabolic and
hormonal health: testosterone-therapy clinics, GLP-1 prescribers, licensed
compounding pharmacies, and strength gyms. Every state is covered by the
public registries; twenty metros are additionally mapped at street scale.
Each hexagon of the map gets a Metabolic Infrastructure Index (MII) from 0 to
100. A zip lookup ranks the nearest listings of each type by distance, with
the price members report paying.

## What it is not

- It is **not about people.** Every layer describes a business or a building.
  No layer uses, infers, or stores anything about residents: no census person
  data, no voter data, no demographics, no health status of anyone.
- It is **not a referral.** A listing means a public registry says the business
  exists under a relevant category. It is not an endorsement, and a prescriber
  appearing here is not a recommendation to use one. Reviewed providers live in
  the [directory](https://skinoversteel.com/directory), where the trust criteria
  are published and a paid relationship never moves a rank.
- It is **not a legal opinion.** Compounding, telehealth, and controlled-substance
  rules differ by state. The pharmacy layer asserts licensure or FDA
  registration only, never that a particular prescription is lawful in a
  particular state.
- It is **not for housing, lending, or insurance.** The index must not be used
  in, or marketed toward, any decision about a person's housing, credit, or
  insurability. The data license (CC BY-NC 4.0) and this page say so.

## Coverage

| Tier | Layers | Resolution | Scored against |
| --- | --- | --- | --- |
| National overview | TRT, GLP-1, pharmacy | H3 r4–r5 | national distribution |
| Every state | TRT, GLP-1, pharmacy (+ gyms inside metros) | H3 r6–r7 | national distribution |
| 20 metros | all four | H3 r7–r9 | the metro's own distribution (and the national score alongside) |

Metros: Dallas–Fort Worth, Houston, Austin, San Antonio, Phoenix, Atlanta,
Miami–Fort Lauderdale, Tampa Bay, Las Vegas, Nashville, Los Angeles, New York,
San Francisco Bay Area, Seattle, Boston, Washington DC, Denver, Salt Lake City,
Chicago, Minneapolis–St. Paul. The gym layer and the OpenStreetMap pharmacy
candidates exist only inside these boxes; outside them the index is computed
from the three registry layers with their weights renormalised, and the hex
carries `coverage: registry`.

## Sources (all public, all business-level)

| Layer | Source | What we keep | What we drop |
| --- | --- | --- | --- |
| TRT clinics | NPI registry, monthly NPPES Data Dissemination file (all states): taxonomy codes 207RE0101X endocrinology, 208800000X urology, 2083P0901X public health & general preventive medicine; 207Q00000X family medicine and 207R00000X internal medicine only on a name-keyword hit (testosterone, hormone, low T, men's health, andropause, anti-aging, longevity). Deactivated NPIs skipped. | Practice-location address, organization name, taxonomy codes | Individual practitioners' names (a solo office is labelled by specialty only), mailing addresses, phone numbers |
| GLP-1 prescribers | NPI 207RB0002X obesity medicine, name keywords (weight loss, metabolic, semaglutide, tirzepatide); CMS Open Payments general payments from Novo Nordisk and Eli Lilly tied to Ozempic, Wegovy, Mounjaro, Zepbound, Rybelsus, Saxenda, Victoza, grouped to distinct business addresses per state. Each address is then joined to the NPI registry's **organizations** (NPI-2) at the same normalised street line, suite and zip; a unique match supplies the business name | Practice address; the registered organization's legal business name when exactly one organization is registered at that suite | Recipient name, NPI, payment amounts, payment nature. Individual practitioners (NPI-1) are never used to name an address. A building with several organizations and no suite match stays "GLP-1 prescribing practice" and is tagged multi-tenant |
| Compounding pharmacies | NPI registry organizations whose taxonomy includes 3336C0004X "Pharmacy, Compounding Pharmacy", all states (self-declared: a registry match, not a license); FDA registered outsourcing facilities (503B), all states; state boards of pharmacy license exports (503A, sterile and non-sterile flags), one CSV per state as operators add them, which verify a registry row by name and zip; OpenStreetMap name search inside metros for candidates | Name, address, license class | Nothing: a pharmacy without a board or FDA listing is shown as a registry match or an unverified candidate, never as licensed |
| Gyms | OpenStreetMap (leisure=fitness_centre, sport=*) inside metro boxes, optional Google Places text search | Name, address, coordinates, tag words (CrossFit, powerlifting, barbell, strength, strongman; independent fitness centres at lower confidence) | Big-box chains (Planet Fitness, LA Fitness, 24 Hour, Anytime, Life Time, Equinox, Gold's, YMCA, Crunch, EoS), reviews, photos |

Zip codes resolve to Census ZCTA internal-point centroids (2023 Gazetteer),
with GeoNames postal data filling names and non-ZCTA zips. Street-address
geocoding uses the Census Bureau batch geocoder; rows it cannot match stay at
their zip centroid and are labelled "zip-level location" wherever they appear.
Inside metros, Nominatim fills some of those gaps under its usage policy (one
request per second, identified user agent). Distances on `/near-me` are
great-circle miles from the zip centroid.

## Confidence

Every listing carries a confidence from 0 to 1 that it actually offers the
thing its layer names:

| Confidence | Means |
| --- | --- |
| 0.85 and up | Licensed or verified: a board/FDA license, or a specialty registry match plus a name keyword |
| 0.6 to 0.85 | Specialty match: the registry taxonomy alone (an endocrinologist may or may not run a TRT program; a pharmacy that declares the compounding taxonomy has not been checked against its board) |
| 0.3 to 0.6 | Keyword match: a generalist whose name says hormones or weight loss, an independent gym, or an unlicensed pharmacy candidate |

Rows under 0.3 are not published. Confidence weights the index and breaks
distance ties in the lookup. It is never moved by money.

## The index

For each H3 hexagon and each layer *k* that covers it:

```
raw_k  = Σ confidence of listings inside the hex
       + 0.5 × Σ confidence of listings in the six neighbouring hexes
comp_k = min(1, ln(1 + raw_k) / ln(1 + P95_k))
MII    = 100 × Σ_k w_k · comp_k / Σ_k w_k       w = 0.30 TRT, 0.25 GLP-1, 0.20 pharmacy, 0.25 gym
```

P95 is the 95th percentile of raw_k over the region the layer is scored
against: the whole country for national and state layers, the metro itself
for metro layers. Every hex also carries the nationally scored value
(`mii_us`) so the two can be compared. The log compresses the top end so one
medical tower does not flatten the rest of the map. The neighbour term
smooths single-listing noise. A hex with no listings in or around it is not
drawn. Weights are a judgment call, published here, and revisited with each
quarterly snapshot.

## Programmatic pages

A city gets a `/trt/{state}/{city}` page only with five or more TRT listings,
and a `/glp1/{state}/{city}` page only with eight or more GLP-1 listings.
Below that the city is reachable through the lookup and the state map but is
not given a page of its own, because a page with two rows is noise for
readers and for search engines alike.

## Prices

Price ranges are what members report paying per month, with what the price
covered. A listing shows a member range only once three or more approved
reports exist; it is the interquartile range, so a single outlier cannot move
it. Below three reports the published range for that category is shown and
attributed. Reports never include names, emails, or phone numbers; the API
rejects them.

## Submissions and moderation

Members can report a price, a correction, a closure, or a missing business.
Every report is created as `pending` and reaches the site only after a
moderator approves it and the dataset is rebuilt. A report stores an account
id and the form fields. IP addresses and user agents are never read or stored.
The community rule applies: share your experience, don't prescribe to others.

## Snapshots

The dataset is rebuilt from the sources and frozen once a quarter. Openings,
closings, counts per city and median reported prices are appended to a time
series so change over time can be published later. A business id is a hash of
its name, address and zip, so a move or rename reads as a closure plus an
opening.

## Money

There is no paid placement on the map. If sponsored pins or verified-pricing
badges ever ship, they will be labelled as such, kept out of the ranking and
the index, and described on this page before they go live. Any paid
relationship with a listed business follows the same rule as the directory: it
is disclosed at the link and it never changes a rank, a score, or a grade.

## Limits

- Registries lag. A clinic can close months before NPPES notices.
- "Keyword match" is exactly that. A wellness clinic's name is not a workup.
- Open Payments is a prescribing proxy, not a prescribing record. A business name attached to one of its addresses is the organization registered there with NPPES, which can be a group practice, a hospital, or a clinic whose specialty has nothing to do with GLP-1; the payment record is what put the address on the map. A registered legal business name can contain a practitioner's name (for example "J. Smith, M.D., PLLC"); that is the business's own registration, not a person-level record.
- State board exports are manual, so "licensed" 503A rows grow state by
  state. Until a state's file exists, its compounders appear as NPPES
  registry matches (self-declared taxonomy, confidence 0.7), FDA 503B
  facilities, or OpenStreetMap candidates. Public state license datasets
  that do exist (Connecticut, Delaware) do not flag compounding, so they
  cannot serve as the gate.
- The gym layer is metro-only. A state hex's score outside a metro says
  nothing about gyms.
- The national and state layers place about one row in ten at its zip
  centroid rather than its street; those rows say so.

## Reproduce it

The pipeline is a set of standalone Python scripts in the repository's `/etl`
directory, documented in `etl/README.md`. The exported hex layers are
downloadable under `/data/nearme/` (national `us/`, `states/{st}/`,
`metros/{slug}/`) as compact JSON, one row per hex (H3 index, scores, counts;
the outline follows from the index), under CC BY-NC 4.0 with attribution to
Skin Over Steel. Run `aggregate_h3.py --geojson` for GeoJSON.
