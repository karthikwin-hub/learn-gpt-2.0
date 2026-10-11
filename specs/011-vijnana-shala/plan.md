# Implementation Plan: 011 Vijnana (Science) Shala — Body, Light, Motion & Living Systems

Feature Branch: `feat/011-vijnana-shala`

## Architecture & Module Ownership
1. **Domain Layer (`src/domain/science/`)**:
   - `digest.ts`: Human digestive tract sequence, organ metadata, nutrient/water absorption calculation.
   - `shadow.ts`: Shadow length formula $\frac{h \cdot d}{L - h}$, material opacity levels.
   - `ramp.ts`: Friction roll distances on Tile (6.0), Wood (3.8), Rug (1.9), Sand (1.2) pretend metres, fair testing rule check.
   - `seed.ts`: Seed structure layers, germination requirement verification.
   - `balance.ts`: Two-pan beam tilt and equilibrium calculation.
   - Accompanying unit tests `src/domain/science/*.test.ts`.
2. **Presentation Layer (`src/ui/components/screens/`)**:
   - `digest.ts`: Digestion Journey screen (`#digest`).
   - `shadow.ts`: Shadow & Sundial screen (`#shadow` and `#sundial`).
   - `ramp.ts`: Ramp & Friction fair test screen (`#ramp`).
   - `seed.ts`: Seed Germination screen (`#seed`).
   - `balance.ts`: Two-Pan Balance screen (`#balance`).
3. **Application Routing (`src/main.ts`)**:
   - Register screen builders: `createDigestScreen`, `createShadowScreen`, `createRampScreen`, `createSeedScreen`, `createBalanceScreen`.
4. **Curriculum Knots (`src/domain/curriculum/curriculum.ts`)**:
   - Update `J2` -> `bench('seed')`, `K1` -> `bench('balance')`.
5. **Testing**:
   - Unit tests covering all domain modules in `src/domain/science/`.
   - Acceptance tests `tests/acceptance/011-vijnana-shala.spec.ts`.
   - E2E journey test `tests/e2e/journeys/011-journeys.spec.ts`.
