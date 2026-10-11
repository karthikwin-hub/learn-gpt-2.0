# Math Domain Rules

**Owning Module**: `src/domain/math/`  
**Owner**: Core Team  
**Governing Invariant**: INV-1 (Single Domain Ownership)  
**Reference Sources**: [docs/product/CURRICULUM.md](../product/CURRICULUM.md), [docs/product/CURRICULUM_PHASE2.md](../product/CURRICULUM_PHASE2.md), [docs/product/DEV_HANDOFF.md](../product/DEV_HANDOFF.md) §8.2

---

## 1. Domain Scope & Responsibilities
`src/domain/math/` owns all mathematical calculations, models, and validations for Class 5 Ganita. It is pure TypeScript and must NEVER import UI, DOM, or persistence packages.

This module owns:
- **Multiplication (`multiply.ts`)**:
  - Area models and partial products (cutting rectangles into rooms).
  - Common multiples and lowest common multiple (LCM).
  - Standard column method steps and partial sums.
- **Division (`divide.ts`)**:
  - Fair share partitioning: equal distribution and integer remainders ($a = b \times q + r, 0 \le r < b$).
  - Leftover sharing converting remainders to fractions.
- **Geometry & Measurement (`geometry.ts`, `kolam.ts`)**:
  - Fixed perimeter constraints (rope rectangle perimeter $2(w + h) = P$) and area optimization.
  - Symmetries: rotational symmetry order and reflection lines (mirror axes).
- **Sets & Logic (`sets.ts`, `logic.ts`)**:
  - Venn diagram region partitioning (Both, Only A, Only B, Neither).
  - Boolean logic gates: AND, OR, NOT gate truth evaluation and counterexample generation.
- **Number & Operations (`number.ts`)**:
  - Place value bundling and decomposition across Indian units (Ones, Tens, Hundreds, Thousands, Ten-Thousands, Lakh, Ten-Lakh, Crore) and International grouping.
  - Equivalent fractions and fraction comparisons.
  - Currency conversion: Rupees and paise ($1\text{ ₹} = 100\text{ p}$).

---

## 2. Invariant Known Values
Every implementation of these mathematical rules must pass the test cases established in `DEV_HANDOFF.md` §8.2:

| Area | Input | Expected Output |
|---|---|---|
| Multiply (rooms) | 23 × 14 cut at tens | rooms: 200, 30, 80, 12; total: 322 |
| Multiply (rooms) | 17 × 12 | rooms: 100, 70, 20, 14; total: 204 |
| Multiply (LCM) | 4 and 6; 3 and 4 | 12; 12 (next meeting of 4 and 6 is 24) |
| Divide | 12 ÷ 4; 14 ÷ 4 | 3 r 0; 3 r 2 |
| Divide (leftovers) | 2 left over among 4 plates | each plate gets $2/4 = 1/2$ more |
| Geometry (rope) | 24 m rope | perimeter = 24; maximum area = 36 at 6 × 6 |
| Geometry (rope) | 20 m rope | maximum area = 25 at 5 × 5 |
| Kolam symmetry | Order 4, turn only | No mirror lines; matches after 90° rotation |
| Kolam symmetry | Order 4, mirror | 4 mirror lines; 90° rotations |
| Sets | Rules: yellow and circle (12 blocks) | $\text{both} + \text{only A} + \text{only B} + \text{neither} = 12$ |
| Logic | Gates AND, OR, NOT | AND is TRUE only for (true, true); OR is TRUE if either is true; NOT inverts |
| Number bundling | `addOne(digits(99999, 7))` | 100000; Indian: `1,00,000`, International: `100,000` |
| Number bundling | `addAt(digits(9000000, 7), 6)` | `full: true`, digits unchanged |
| Fractions | Equivalences | $1/2 = 2/4 = 3/6$; $3/4 = 6/8$; $\text{compare}(1/3, 1/2) = -1$ |
| Money | `parseRupees('4.5')`, `('0.45')`, `('12.50')` | 450, 45, 1250 paise; ₹0.5 > ₹0.45 |

---

## 3. Dependency Constraints
- May NOT import UI or browser packages (`window`, `document`, HTML elements).
- May NOT import `src/domain/science/`, `src/domain/world/`, or `src/domain/curriculum/`.
- Pure functions only: takes plain values/types and returns plain values/types.
