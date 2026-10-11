# Implementation Plan: 012 Loka (Social Studies) Shala

## 1. Domain Modeling (`src/domain/world/`)
- `timeline.ts`:
  - `signed(year: number, era: 'BCE' | 'CE'): number`: validates positive non-zero year, throws on 0.
  - `yearsBetween(a: number, b: number): number`: computes absolute year difference skipping zero when signs differ.
  - `isEarlier(a: number, b: number): boolean`: strict inequality.
  - `centuryCE(year: number): number`: `Math.ceil(year / 100)`.
  - `EVENTS`: 6 historical events (`harappa`, `ashoka`, `aryabhata`, `taj`, `independence`, `chandrayaan`).
  - `chronological(ids: string[]): boolean`.
- `earth.ts`:
  - `hourAt(spinDeg: number): number`: solar hour in India based on North Pole spin angle.
  - `isDay(hour: number): boolean`: $6 \le \text{hour} < 18$.
  - `northernSeason(month: number): 'summer' | 'winter' | 'spring' | 'autumn'`: returns seasons based on orbital month where month 5 is summer and month 11 is winter.
- `map.ts`:
  - `DIRS`: coordinate offsets for N, E, S, W.
  - `step(at: [number, number], dir: CompassDir): [number, number]`.
  - `walk(start: [number, number], moves: CompassDir[]): [number, number][]`.
  - `COURTYARD`: $8 \times 6$ layout with gate $[1,5]$, well $[6,1]$, tulsi $[3,2]$, tree $[1,1]$, and house blocks.
  - `isBlocked(col: number, row: number): boolean`.
  - `realDistance(squares: number, metresPerSquare: number): number`.

## 2. Lesson Definitions (`src/domain/lesson/`)
- `i2.ts`: Lesson structure for Thread of Time with Bodha cards, Prashna, Explain back, Spot the mistake.
- `e1.ts`: Lesson structure for Spin and Travel.
- `e4.ts`: Lesson structure for Courtyard from Above.
- Register all three in `src/domain/lesson/registry.ts`.

## 3. Screen Implementations (`src/ui/components/screens/`)
- `src/ui/components/screens/timeline.ts`: `#timeline` interactive workbench.
- `src/ui/components/screens/earth.ts`: `#earth` interactive workbench.
- `src/ui/components/screens/map.ts`: `#map` interactive workbench.
- Register screens in `src/main.ts`.

## 4. Verification & Testing
- Unit tests: `timeline.test.ts`, `earth.test.ts`, `map.test.ts`, `index.test.ts`.
- Acceptance tests: `tests/acceptance/012-loka-shala.spec.ts`.
- Journey tests: `tests/e2e/journeys/012-journeys.spec.ts`.
- Full 11-sensor verification script `python3 scripts/harness/verify.py`.
