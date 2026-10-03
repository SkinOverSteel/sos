"""
Moderation CLI for Near Me submissions (table: nearme_submissions, schema.sql).

  python moderate.py list                      pending queue
  python moderate.py approve <id> [<id>...]
  python moderate.py reject <id> "<reason>"
  python moderate.py export                    approved price reports ->
                                               etl/data/price_reports.csv (read by aggregate_h3.py)

DATABASE_URL: postgres://... (needs psycopg) or sqlite:///path.db (default:
sqlite:///etl/out/nearme.db). Moderators publish nothing automatically: a
report only reaches the site after `approve` + `export` + a rebuild.
"""
from __future__ import annotations

import csv
import datetime as dt
import os
import sqlite3
import sys

from common import DATA_DIR, OUT_DIR

URL = os.environ.get("DATABASE_URL", f"sqlite:///{os.path.join(OUT_DIR, 'nearme.db')}")


def connect():
    if URL.startswith("sqlite:///"):
        os.makedirs(OUT_DIR, exist_ok=True)
        con = sqlite3.connect(URL[len("sqlite:///"):])
        con.row_factory = sqlite3.Row
        with open(os.path.join(os.path.dirname(__file__), "schema.sql")) as f:
            con.executescript(f.read())
        return con, "?"
    import psycopg  # type: ignore
    con = psycopg.connect(URL, row_factory=psycopg.rows.dict_row)
    return con, "%s"


def main(argv):
    cmd = argv[1] if len(argv) > 1 else "list"
    con, ph = connect()
    cur = con.cursor()
    now = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    who = os.environ.get("MODERATOR", os.environ.get("USER", "cli"))
    if cmd == "list":
        cur.execute("SELECT id, created_at, kind, report_type, business_name, poi_id, city, monthly_usd, note FROM nearme_submissions WHERE status='pending' ORDER BY created_at")
        for r in cur.fetchall():
            r = dict(r)
            print(f"{r['id']}  {r['created_at'][:10]}  {r['kind']:8} {r['report_type']:10} {r['business_name'] or r['poi_id']}  {r['city'] or ''}  {r['monthly_usd'] or ''}  {(r['note'] or '')[:60]}")
    elif cmd == "approve":
        for sid in argv[2:]:
            cur.execute(f"UPDATE nearme_submissions SET status='approved', moderated_at={ph}, moderated_by={ph} WHERE id={ph}", (now, who, sid))
        con.commit(); print(f"approved {len(argv) - 2}")
    elif cmd == "reject":
        cur.execute(f"UPDATE nearme_submissions SET status='rejected', moderated_at={ph}, moderated_by={ph}, reject_reason={ph} WHERE id={ph}", (now, who, argv[3] if len(argv) > 3 else "", argv[2]))
        con.commit(); print("rejected")
    elif cmd == "export":
        cur.execute("SELECT poi_id, kind, city, monthly_usd, includes, created_at FROM nearme_submissions WHERE status='approved' AND report_type='price' AND poi_id IS NOT NULL AND monthly_usd IS NOT NULL")
        rows = [dict(r) for r in cur.fetchall()]
        os.makedirs(DATA_DIR, exist_ok=True)
        with open(os.path.join(DATA_DIR, "price_reports.csv"), "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=["poi_id", "kind", "city", "monthly_usd", "includes", "created_at", "status"])
            w.writeheader()
            for r in rows:
                w.writerow({**r, "status": "approved"})
        print(f"exported {len(rows)} approved price reports")
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main(sys.argv)
