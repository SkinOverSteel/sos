-- Near Me: user submissions (price + clinic reports), moderated before publish.
-- Works on Postgres and SQLite. Deliberately NO ip, user-agent, email, or
-- free-form location: a submission is tied to an account id only.
CREATE TABLE IF NOT EXISTS nearme_submissions (
  id            TEXT PRIMARY KEY,                 -- uuid
  created_at    TEXT NOT NULL,                    -- ISO-8601 UTC
  account_id    TEXT NOT NULL,                    -- pseudonymous member id (never email)
  -- one of common.KINDS (metabolic layers + care layers); migrations/002_care_kinds.sql widens an existing table
  kind          TEXT NOT NULL CHECK (kind IN ('trt','glp1','pharmacy','gym','urology','endo','implant','shockwave','ved','sleep','lab','sextherapy')),
  poi_id        TEXT,                             -- existing POI id, or NULL for a new-clinic report
  business_name TEXT,                             -- required when poi_id is NULL
  city          TEXT,
  zip           TEXT CHECK (zip IS NULL OR length(zip) = 5),
  report_type   TEXT NOT NULL CHECK (report_type IN ('price','new','closed','correction')),
  monthly_usd   REAL CHECK (monthly_usd IS NULL OR (monthly_usd >= 0 AND monthly_usd < 10000)),  -- price paid in the kind's unit (per month, visit, study, course...; see PRICE_UNIT in src/lib/nearme.ts)
  includes      TEXT,                             -- what the price covers (labs, meds, visits), short text
  note          TEXT,                             -- <= 500 chars, no PII by policy
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  moderated_at  TEXT,
  moderated_by  TEXT,
  reject_reason TEXT
);
CREATE INDEX IF NOT EXISTS nearme_submissions_status ON nearme_submissions (status, created_at);
CREATE INDEX IF NOT EXISTS nearme_submissions_poi ON nearme_submissions (poi_id);
