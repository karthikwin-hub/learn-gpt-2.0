"""Minimal ESRI shapefile reader (standard library only): polygons, polylines and their .dbf attributes."""

from __future__ import annotations

import struct
from pathlib import Path

POLYLINE, POLYGON = 3, 5
SUPPORTED = {POLYLINE, POLYGON, 13, 15, 23, 25}  # Z and M variants carry the same x, y block first


def read_shapes(shp: Path) -> list[list[list[tuple[float, float]]]]:
    """One entry per record: a list of parts, each a list of (x, y)."""
    data = shp.read_bytes()
    pos, out = 100, []
    while pos + 8 <= len(data):
        _num, length = struct.unpack(">ii", data[pos : pos + 8])
        rec = data[pos + 8 : pos + 8 + length * 2]
        pos += 8 + length * 2
        (kind,) = struct.unpack("<i", rec[:4])
        if kind == 0:
            out.append([])
            continue
        if kind not in SUPPORTED:
            raise ValueError(f"Unsupported shape type {kind} in {shp.name}")
        num_parts, num_points = struct.unpack("<ii", rec[36:44])
        parts = list(struct.unpack(f"<{num_parts}i", rec[44 : 44 + 4 * num_parts]))
        base = 44 + 4 * num_parts
        pts = [struct.unpack("<dd", rec[base + 16 * i : base + 16 * i + 16]) for i in range(num_points)]
        bounds = parts + [num_points]
        out.append([pts[bounds[i] : bounds[i + 1]] for i in range(num_parts)])
    return out


def read_records(dbf: Path, encoding: str = "utf-8") -> list[dict[str, str]]:
    data = dbf.read_bytes()
    num, header_len, rec_len = struct.unpack("<IHH", data[4:12])
    fields, pos = [], 32
    while data[pos] != 0x0D:
        name = data[pos : pos + 11].split(b"\0", 1)[0].decode("ascii")
        fields.append((name, data[pos + 16]))
        pos += 32
    out = []
    for i in range(num):
        start = header_len + i * rec_len
        rec, off, row = data[start : start + rec_len], 1, {}
        for name, size in fields:
            row[name] = rec[off : off + size].decode(encoding, "replace").strip()
            off += size
        out.append(row)
    return out
