# Plan: 006 Sets threads (S1–S3), Sorting Courtyard, Venn Union & Intersection

Status: Approved · Feature Branch: `feat/006-sets` · Spec: [spec.md](spec.md)

---

## 1. Architecture & Port Map

```
learn-gpt-2.0/
├── src/domain/math/
│   ├── sets.ts                  <-- Pure set membership, 12 blocks, counts, sameSort
│   ├── sets.test.ts             <-- Unit test suite
│   └── index.ts                 <-- Export sets domain model
├── src/ui/manipulatives/
│   └── courtyard.ts             <-- Sorting courtyard SVG manipulative with 12 blocks & rings
├── src/ui/components/screens/
│   └── sets.ts                  <-- Sets workbench screen (sort & guess modes)
├── src/ui/diagrams/
│   └── sets.ts                  <-- Bodha S2/S3 two-ring Venn diagrams
├── src/domain/lesson/
│   ├── s1.ts, s2.ts, s3.ts      <-- Knot lesson definitions & explain questions
│   └── registry.ts              <-- Register S1–S3
├── tests/acceptance/
│   └── 006-sets.spec.ts         <-- End-to-end acceptance suite (US1–US5)
├── tests/e2e/mockup/
│   └── 006-sets.spec.ts         <-- Mockup parity test suite
└── tests/e2e/journeys/
    └── 006-journeys.spec.ts     <-- User journeys (J5 for S2/S3, J2 language persistence)
```

---

## 2. Invariants & Implementation Details
1. **Mathematical Invariant**: 12 attribute blocks partitions strictly into 4 disjoint regions: $A \cap B$, $A \setminus B$, $B \setminus A$, and $U \setminus (A \cup B)$. Sum of counts is always 12.
2. **Pedagogical Invariant**: Zero praise words or gamification tokens. Kumkum outline signifies attention/homeless status, never failure or wrongness.
3. **State Preservation**: In-place language toggling preserves rule selections, layout, ring positions, and block assignments.
