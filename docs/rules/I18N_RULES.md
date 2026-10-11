# Internationalization (i18n) Rules

**Owning Module**: `src/domain/i18n/`  
**Owner**: Core Team  
**Governing Invariant**: INV-1 (Single Domain Ownership)  
**Reference Sources**: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) Principle V, [docs/product/DEV_HANDOFF.md](../product/DEV_HANDOFF.md) §6.5 & §8.3, [docs/agent-memory/lessons.md](../agent-memory/lessons.md)

---

## 1. Domain Scope & Responsibilities
`src/domain/i18n/` owns all multilingual strings, lookup tables, formatting utilities, and script integrity checks for the 5 supported languages:
- English (`en`)
- Hindi (`hi` - Devanagari script)
- Telugu (`te` - Telugu script)
- Bengali (`bn` - Bengali script)
- Tamil (`ta` - Tamil script)

---

## 2. Invariant Rules
- **Contract of Keys**: String keys are an explicit contract. Prototype keys must be preserved verbatim. Hardcoded user-facing strings in UI components are forbidden.
- **Fail-Safe Fallback**: If a key is missing in a non-English language, the system must fall back to English and emit a console warning in development mode only.
- **Duplicate Key Prevention**: Duplicate keys within any language's dictionaries must throw an error at initialization time.
- **Placeholder Parity**: All named placeholders `{variable}` present in the English string must be present in every translated equivalent.
- **Glossary Format**: Bodha terminology markup `[[id|term]]` must preserve the identifier `id` across all translations.
- **Script Purity**: Non-English values must be written primarily in their respective native script (Devanagari for Hindi, Telugu for Telugu, Bengali for Bengali, Tamil for Tamil). Latin characters may not outnumber native script characters in values longer than six characters (except permitted terms like ₹, ×, BCE, CE, AND, OR, NOT).
- **Draft Status**: All non-English strings are marked with a header comment indicating draft status until native-teacher review is recorded.

---

## 3. Dependency Constraints
- Pure TypeScript dictionaries and string interpolation functions only.
- Zero external UI or DOM dependencies.
