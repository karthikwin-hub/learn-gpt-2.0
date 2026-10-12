# Implementation Plan: 025 Angles as Turns (Knot G1)

## 1. Technical Architecture & Module Placement

### 1.1 Domain Module (`src/domain/math/angles.ts`)
- **Types**:
  ```ts
  export type AngleType = 'zero' | 'acute' | 'right' | 'obtuse' | 'straight' | 'reflex' | 'full';

  export interface AngleInfo {
    degrees: number;
    radians: number;
    type: AngleType;
    turnFraction: { num: number; den: number };
    labelKey: string;
  }
  ```
- **Pure Functions**:
  - `classifyAngle(degrees: number): AngleType`
  - `turnFraction(degrees: number): { num: number; den: number }`
  - `getAngleInfo(degrees: number): AngleInfo`
  - `arcCoordinates(cx: number, cy: number, radius: number, angleDegrees: number): string`
  - `isArmLengthInvariant(angle1: number, length1: number, angle2: number, length2: number): boolean`

### 1.2 Aggregator & Registry
- Re-export `src/domain/math/angles.ts` in `src/domain/math/index.ts`.
- Register updated `G1_LESSON` with mistake and explain definitions in `src/domain/lesson/g1.ts` and `src/domain/lesson/registry.ts`.
- Bind `G1` as `{ prashna: true, bench: bench('angles') }` in `src/domain/curriculum/curriculum.ts`.

### 1.3 UI Screen (`src/ui/components/screens/angles.ts`)
- Mount at `#angles`.
- Canvas/SVG angle visualizer:
  - Base horizontal ray (fixed).
  - Terminal ray (draggable circular vertex knob).
  - Wedge arc filling sector with calm indigo tint.
  - Arm length slider with dual numeric stepper (keyboard accessible).
  - Snap buttons: $45^\circ$, $90^\circ$, $180^\circ$, $270^\circ$, $360^\circ$.
  - Dual clock comparison tool showing equal angles with unequal arm lengths.

### 1.4 Acceptance Test Suite (`tests/acceptance/025-angles.spec.ts`)
- Playwright tests across 360px and 390px mobile viewports covering US1 to US5.
