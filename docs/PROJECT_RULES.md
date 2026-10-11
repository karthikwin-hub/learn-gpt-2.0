# Project Rules

<!-- Agentic Delivery Standard v1.0 · tier: SEED (project-owned). Project-specific additions for Learn GPT 2.0. -->

## Project-specific invariants
- **Secrets & Environment Variables Management**: All secrets, environment variables, API keys, and credentials MUST be stored in **Infisical** under the project **`learn_gpt`**.
- Under no circumstances should secrets or environment variables be stored in plain text, hardcoded in source files, checked into git, or written to unmanaged local files.
- Local execution requiring secrets must be invoked via Infisical (e.g. `infisical run -- ...`) or synced securely.
- Zero analytics, zero ad tracking, zero telemetry in accordance with DPDP Act 2023 for child privacy.

## Glossary
| Term | Meaning in this project |
|---|---|
| Microworld | Interactive, constructivist digital environment where mathematical principles are directly manipulated and self-evident. |
| Manipulative | Active visual/tactile component (e.g., dynamic parallelogram, Turing Tumble pegboard) that explains a mathematical structure through direct physical interaction. |
| CPA | Concrete-Pictorial-Abstract representational learning sequence (Bruner). |
| Visual Residue | Persistent ghosted trails or state markers remaining visible to offload working memory. |

## Policies and links
- Secrets management: Infisical (`learn_gpt` project)
- Child Privacy & Minors Protection: DPDP Act 2023 compliant
- Typography & Localization: Google Noto Sans (English, Hindi, Telugu, Bengali, Tamil)
