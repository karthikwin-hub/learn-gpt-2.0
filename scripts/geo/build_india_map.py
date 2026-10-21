"""Build src/domain/world/geo/india-map.ts from Survey of India state boundaries and Natural Earth rivers.

Standard library only. Usage:
  python3 scripts/geo/build_india_map.py --states <SoI states .shp> --rivers <NE rivers .shp> [--name-field FIELD]

Fails, rather than guessing, on an unknown coordinate system, an unknown state name, or anything other
than 28 states and 8 union territories. Never hand-edit the boundaries it writes.
"""

from __future__ import annotations

import argparse
import math
import re
import sys
import unicodedata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from shapefile_lite import read_records, read_shapes  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "src/domain/world/geo/india-map.ts"
WIDTH = 500.0
PAD = 6.0
COS = math.cos(math.radians(22.0))
MAX_BYTES = 80_000

STATE_IDS = {
    "andhrapradesh": "ap", "arunachalpradesh": "arunachal", "assam": "assam", "bihar": "bihar",
    "chhattisgarh": "cg", "goa": "goa", "gujarat": "gujarat", "haryana": "haryana",
    "himachalpradesh": "hp", "jharkhand": "jharkhand", "karnataka": "karnataka", "kerala": "kerala",
    "madhyapradesh": "mp", "maharashtra": "maharashtra", "manipur": "manipur", "meghalaya": "meghalaya",
    "mizoram": "mizoram", "nagaland": "nagaland", "odisha": "odisha", "punjab": "punjab",
    "rajasthan": "rajasthan", "sikkim": "sikkim", "tamilnadu": "tn", "telangana": "telangana",
    "tripura": "tripura", "uttarpradesh": "up", "uttarakhand": "uk", "westbengal": "wb",
    "andamanandnicobarislands": "andaman", "andamanandnicobar": "andaman", "chandigarh": "chandigarh",
    "dadraandnagarhavelianddamananddiu": "dnhdd", "delhi": "delhi", "nctofdelhi": "delhi",
    "jammuandkashmir": "jk", "ladakh": "ladakh", "lakshadweep": "lakshadweep", "puducherry": "puducherry",
}
UTS = {"andaman", "chandigarh", "dnhdd", "delhi", "jk", "ladakh", "lakshadweep", "puducherry"}

RIVER_IDS = {
    "ganges": "ganga", "yamuna": "yamuna", "brahmaputra": "brahmaputra", "dihang": "brahmaputra",
    "indus": "indus", "sutlej": "sutlej", "godavari": "godavari", "krishna": "krishna",
    "cauvery": "kaveri", "narmada": "narmada", "tapi": "tapi", "mahananadi": "mahanadi", "chambal": "chambal", "son": "son", "ghaghara": "ghaghara",
}


def key(name: str) -> str:
    plain = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z]", "", plain.replace("&", "and"))


# --- coordinate systems -------------------------------------------------------------------------


def to_lonlat(prj_text: str):
    """Return a function (x, y) -> (lon, lat) for the .prj, or exit if it is not one we handle exactly."""
    if not prj_text.strip().startswith("PROJCS"):
        if prj_text.strip().startswith("GEOGCS"):
            return lambda x, y: (x, y)
        sys.exit(f"Unknown coordinate system in .prj: {prj_text[:120]}")
    if "Lambert_Conformal_Conic" not in prj_text:
        sys.exit(f"Projected data that is not Lambert Conformal Conic; add it explicitly: {prj_text[:160]}")
    params = {k.lower(): float(v) for k, v in re.findall(r'PARAMETER\["([^"]+)",\s*([-\d.eE+]+)\]', prj_text)}
    sph = re.search(r'SPHEROID\["[^"]*",\s*([\d.]+),\s*([\d.]+)', prj_text)
    unit = re.findall(r'UNIT\["[^"]*",\s*([\d.]+)\]', prj_text)
    if not sph or not unit:
        sys.exit("Lambert .prj without a spheroid or unit")
    a, inv_f = float(sph.group(1)), float(sph.group(2))
    to_m = float(unit[-1])
    f = 1 / inv_f if inv_f else 0.0
    e = math.sqrt(2 * f - f * f)
    p1 = math.radians(params.get("standard_parallel_1", 0))
    p2 = math.radians(params.get("standard_parallel_2", params.get("standard_parallel_1", 0)))
    p0 = math.radians(params.get("latitude_of_origin", 0))
    l0 = math.radians(params.get("central_meridian", 0))
    fe, fn = params.get("false_easting", 0), params.get("false_northing", 0)

    def m(p):
        return math.cos(p) / math.sqrt(1 - (e * math.sin(p)) ** 2)

    def t(p):
        es = e * math.sin(p)
        return math.tan(math.pi / 4 - p / 2) / ((1 - es) / (1 + es)) ** (e / 2)

    n = math.sin(p1) if p1 == p2 else (math.log(m(p1)) - math.log(m(p2))) / (math.log(t(p1)) - math.log(t(p2)))
    big_f = m(p1) / (n * t(p1) ** n)
    rho0 = a * big_f * t(p0) ** n

    def inverse(x, y):
        dx, dy = x * to_m - fe, rho0 - (y * to_m - fn)
        rho = math.copysign(math.hypot(dx, dy), n)
        theta = math.atan2(dx * math.copysign(1, n), dy * math.copysign(1, n))
        tt = (rho / (a * big_f)) ** (1 / n)
        phi = math.pi / 2 - 2 * math.atan(tt)
        for _ in range(8):
            es = e * math.sin(phi)
            phi = math.pi / 2 - 2 * math.atan(tt * ((1 - es) / (1 + es)) ** (e / 2))
        return math.degrees(theta / n + l0), math.degrees(phi)

    return inverse


# --- geometry -----------------------------------------------------------------------------------


def simplify(points, tol):
    if len(points) < 4:
        return points
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        i, j = stack.pop()
        (x1, y1), (x2, y2) = points[i], points[j]
        dx, dy = x2 - x1, y2 - y1
        norm = math.hypot(dx, dy) or 1e-12
        best, at = -1.0, -1
        for k in range(i + 1, j):
            x, y = points[k]
            d = abs(dy * (x - x1) - dx * (y - y1)) / norm if (dx or dy) else math.hypot(x - x1, y - y1)
            if d > best:
                best, at = d, k
        if best > tol:
            keep[at] = True
            stack += [(i, at), (at, j)]
    return [p for p, k in zip(points, keep) if k]


def area(ring):
    return abs(sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]))) / 2


def inside(pt, ring):
    x, y, hit = pt[0], pt[1], False
    for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            hit = not hit
    return hit


def bbox(ring):
    xs, ys = [p[0] for p in ring], [p[1] for p in ring]
    return min(xs), min(ys), max(xs), max(ys)


def tenths(v: int) -> str:
    s = f"{v / 10:.1f}"
    return s[:-2] if s.endswith(".0") else s


def path(rings, closed):
    """SVG path data in tenths of a unit; steps are relative, so rounding never drifts."""
    out = []
    for ring in rings:
        pts = [(round(x * 10), round(y * 10)) for x, y in ring]
        (px, py), cmds = pts[0], [f"M{tenths(pts[0][0])} {tenths(pts[0][1])}"]
        for x, y in pts[1:]:
            if (x, y) != (px, py):
                cmds.append(f"l{tenths(x - px)} {tenths(y - py)}")
            px, py = x, y
        out.append("".join(cmds) + ("z" if closed else ""))
    return "".join(out)


# --- build --------------------------------------------------------------------------------------


def load_states(shp: Path, name_field: str | None):
    dbf = shp.with_suffix(".dbf")
    cpg = shp.with_suffix(".cpg")
    enc = cpg.read_text().strip() if cpg.exists() else "utf-8"
    records = read_records(dbf, "utf-8" if enc.upper() in ("UTF-8", "UTF8") else "latin-1")
    shapes = read_shapes(shp)
    if not records:
        sys.exit("No records in the states .dbf")
    field = name_field or next(
        (f for f in records[0] if any(key(r[f]) in STATE_IDS for r in records)), None
    )
    if not field:
        sys.exit(f"No field holds state names; fields are {list(records[0])}. Pass --name-field.")
    unknown = sorted({r[field] for r in records if key(r[field]) not in STATE_IDS})
    if unknown:
        sys.exit(f"Unknown state names in field {field}: {unknown}. Map them in STATE_IDS; never guess.")
    conv = to_lonlat(shp.with_suffix(".prj").read_text())
    states: dict[str, list] = {}
    for rec, parts in zip(records, shapes):
        sid = STATE_IDS[key(rec[field])]
        states.setdefault(sid, []).extend([[conv(x, y) for x, y in part] for part in parts])
    ids = set(states)
    n_ut, n_state = len(ids & UTS), len(ids - UTS)
    if (n_state, n_ut) != (28, 8):
        missing = sorted(set(STATE_IDS.values()) - ids)
        sys.exit(f"Expected 28 states and 8 UTs, found {n_state} and {n_ut}; missing {missing}")
    return states


def build(states_shp: Path, rivers_shp: Path, name_field: str | None) -> str:
    states = load_states(states_shp, name_field)
    lons = [p[0] for rings in states.values() for r in rings for p in r]
    lats = [p[1] for rings in states.values() for r in rings for p in r]
    lon0, lat0 = min(lons), max(lats)
    k = (WIDTH - 2 * PAD) / ((max(lons) - lon0) * COS)
    height = (lat0 - min(lats)) * k + 2 * PAD

    def proj(lon, lat):
        return ((lon - lon0) * COS * k + PAD, (lat0 - lat) * k + PAD)

    projected = {sid: [[proj(*p) for p in r] for r in rings] for sid, rings in states.items()}
    outline = [r for rings in projected.values() for r in rings]
    boxes = [bbox(r) for r in outline]

    def in_india(pt):
        return any(b[0] <= pt[0] <= b[2] and b[1] <= pt[1] <= b[3] and inside(pt, r) for r, b in zip(outline, boxes))

    rivers: dict[str, list] = {}
    for rec, parts in zip(read_records(rivers_shp.with_suffix(".dbf")), read_shapes(rivers_shp)):
        rid = RIVER_IDS.get(key(rec.get("name", "")))
        if not rid:
            continue
        for part in parts:
            run: list = []
            for p in (proj(*q) for q in part):
                if in_india(p):
                    run.append(p)
                elif run:
                    rivers.setdefault(rid, []).append(run)
                    run = []
            if len(run) > 1:
                rivers.setdefault(rid, []).append(run)

    tol = 0.4
    while True:
        state_paths, river_paths = {}, {}
        for sid, rings in sorted(projected.items()):
            big = max(area(r) for r in rings)
            kept = [simplify(r, tol) for r in rings if area(r) >= min(0.6, big)]
            state_paths[sid] = path([r for r in kept if len(r) >= 3], True)
        for rid, runs in sorted(rivers.items()):
            river_paths[rid] = path([s for s in (simplify(r, tol * 1.5) for r in runs) if len(s) > 1], False)
        text = render(state_paths, river_paths, lon0, lat0, k, height)
        if len(text.encode()) <= MAX_BYTES or tol > 3:
            return text
        tol *= 1.25


def render(state_paths, river_paths, lon0, lat0, k, height) -> str:
    def table(name, paths):
        rows = "\n".join(f"  {sid}: '{d}'," for sid, d in paths.items())
        return f"export const {name}: Readonly<Record<string, string>> = {{\n{rows}\n}};\n"

    return (
        "/* Generated by scripts/geo/build_india_map.py from Survey of India state boundaries and Natural Earth\n"
        "   rivers. Do not edit by hand: re-run the generator. */\n\n"
        f"export const MAP_W = {WIDTH:.0f};\nexport const MAP_H = {height:.0f};\n\n"
        "/** Project a latitude and longitude onto the map frame. */\n"
        "export function project(lat: number, lon: number): [number, number] {\n"
        f"  return [(lon - {lon0:.4f}) * {COS * k:.4f} + {PAD}, ({lat0:.4f} - lat) * {k:.4f} + {PAD}];\n"
        "}\n\n" + table("STATE_PATHS", state_paths) + "\n" + table("RIVER_PATHS", river_paths)
    )


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--states", type=Path, required=True)
    ap.add_argument("--rivers", type=Path, required=True)
    ap.add_argument("--name-field")
    args = ap.parse_args()
    text = build(args.states, args.rivers, args.name_field)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(text)
    print(f"wrote {OUT.relative_to(ROOT)}: {len(text.encode()):,} bytes")


if __name__ == "__main__":
    main()
