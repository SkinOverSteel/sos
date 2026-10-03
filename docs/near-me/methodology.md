# Near Me: how the metabolic infrastructure map is built

Version 1 · Dallas–Fort Worth · rendered at [/near-me/methodology](https://skinoversteel.com/near-me/methodology)

## What it is

A map of **businesses** that treat, supply, or support men's metabolic and
hormonal health in Dallas–Fort Worth: testosterone-therapy clinics, GLP-1
prescribers, licensed compounding pharmacies, and strength gyms. Each hexagon
of the map gets a Metabolic Infrastructure Index (MII) from 0 to 100. A zip
lookup ranks the nearest listings of each type by distance, with the price
members report paying.

## What it is not

- It is **not about people.** Every layer describes a business or a building.
  No layer uses, infers, or stores anything about residents: no census person
  data, no voter data, no demographics, no health status of anyone.
- It is **not a referral.** A listing means a public registry says the business
  exists under a relevant category. It is not an endorsement, and a prescriber
  appearing here is not a recommendation to use one. Reviewed providers live in
  the [directory](https://skinoversteel.com/directory), where the trust criteria
  are published and a paid relationship never moves a rank.
- It is **not for housing, lending, or insurance.** The index must not be used
  in, or marketed toward, any decision about a person's housing, credit, or
  insurability. The data license (CC BY-NC 4.0) and this page say so.

## Sources (all public, all business-level)

| Layer | Source | What we keep | What we drop |
| --- | --- | --- | --- |
| TRT clinics | NPI registry (NPPES), taxonomy codes 207RE0101X endocrinology, 208U00000X urology, 2083X0100X preventive medicine, 207Q00000X family medicine and 207R00000X internal medicine only on a name-keyword hit (testosterone, hormone, low T, men's health, andropause, anti-aging, longevity) | Practice-location address, organization name, taxonomy codes | Individual practitioners' names (a solo office is labelled by specialty only), mailing addresses, phone numbers |
| GLP-1 prescribers | NPI 207RB0002X obesity medicine, name keywords (weight loss, metabolic, semaglutide, tirzepatide); CMS Open Payments general payments from Novo Nordisk and Eli Lilly tied to Ozempic, Wegovy, Mounjaro, Zepbound, Rybelsus, Saxenda, Victoza | Practice address, specialty | Recipient name, NPI, payment amounts, payment nature |
| Compounding pharmacies | Texas State Board of Pharmacy license verification (503A, sterile and non-sterile flags), FDA registered outsourcing facilities (503B), OpenStreetMap name search for candidates | Name, address, license class | Nothing: a pharmacy without a TSBP or FDA listing is shown as an unverified candidate at low confidence, never as licensed |
| Gyms | OpenStreetMap (leisure=fitness_centre, sport=*), optional Google Places text search | Name, address, coordinates, tag words (CrossFit, powerlifting, barbell, strength, strongman) | Big-box chains (Planet Fitness, LA Fitness, 24 Hour, Anytime, Life Time, Equinox, Gold's, YMCA, Crunch, EoS), reviews, photos |

Zip codes resolve to ZCTA centroids from the Zippopotam.us public API.
Street-address geocoding uses Nominatim under its usage policy with an
identified user agent and a one-request-per-second cap. Distances on
`/near-me` are great-circle miles from the zip centroid.

## Confidence

Every listing carries a confidence from 0 to 1 that it actually offers the
thing its layer names:

| Confidence | Means |
| --- | --- |
| 0.85 and up | Licensed or verified: a TSBP/FDA license, or a specialty registry match plus a name keyword |
| 0.6 to 0.85 | Specialty match: the registry taxonomy alone (an endocrinologist may or may not run a TRT program) |
| 0.3 to 0.6 | Keyword match: a generalist whose name says hormones or weight loss, or an unlicensed pharmacy candidate |

Rows under 0.3 are not published. Confidence weights the index and breaks
distance ties in the lookup. It is never moved by money.

## The index

For each H3 hexagon at resolution 7 (county scale, ~5 km across), 8 (metro,
~1.2 km) and 9 (street, ~0.5 km), and each layer *k*:

```
raw_k  = Σ confidence of listings inside the hex
       + 0.5 × Σ confidence of listings in the six neighbouring hexes
comp_k = min(1, ln(1 + raw_k) / ln(1 + P95_k))      P95_k = 95th percentile of raw_k over DFW
MII    = 100 × (0.30 TRT + 0.25 GLP-1 + 0.20 pharmacy + 0.25 gym)
```

The log compresses the top end so one medical tower does not flatten the rest
of the map. The neighbour term smooths single-listing noise. A hex with no
listings in or around it is not drawn. Weights are a judgment call, published
here, and revisited with each quarterly snapshot.

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
- Open Payments is a prescribing proxy, not a prescribing record.
- OpenStreetMap coverage of gyms is uneven; Google Places improves recall where
  a key is configured.
- DFW only. Other metros follow the same pipeline when the sources cover them.

## Reproduce it

The pipeline is a set of standalone Python scripts in the repository's `/etl`
directory, documented in `etl/README.md`. The exported hex layers are
downloadable as GeoJSON at `/data/nearme/hex-r{7,8,9}.geojson` under CC BY-NC
4.0 with attribution to Skin Over Steel.
