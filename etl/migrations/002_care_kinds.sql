-- Widen nearme_submissions.kind to the care layers (Near Me v3).
-- schema.sql already carries the new list for fresh databases; run this once
-- against an existing Postgres (Neon) database. SQLite ignores CHECK changes
-- on ALTER, so for a local sqlite file delete etl/out/nearme.db and let
-- moderate.py recreate it from schema.sql.
ALTER TABLE nearme_submissions DROP CONSTRAINT IF EXISTS nearme_submissions_kind_check;
ALTER TABLE nearme_submissions
  ADD CONSTRAINT nearme_submissions_kind_check
  CHECK (kind IN ('trt','glp1','pharmacy','gym','urology','endo','implant','shockwave','ved','sleep','lab','sextherapy'));
