/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'domain-must-not-import-ui',
      comment: 'Domain modules must never import from UI layers (ARCHITECTURE.md §4)',
      severity: 'error',
      from: { path: '^src/domain' },
      to: { path: '^src/ui' },
    },
    {
      name: 'domain-must-not-import-persistence',
      comment: 'Domain modules must never import persistence (ARCHITECTURE.md §4)',
      severity: 'error',
      from: { path: '^src/domain' },
      to: { path: '^src/persistence' },
    },
    {
      name: 'subject-domains-must-not-import-curriculum',
      comment: 'math, science, and world must not import curriculum (ARCHITECTURE.md §4)',
      severity: 'error',
      from: { path: '^src/domain/(math|science|world)' },
      to: { path: '^src/domain/curriculum' },
    },
    {
      name: 'science-and-world-isolated',
      comment: 'science and world must never import each other (ARCHITECTURE.md §4)',
      severity: 'error',
      from: { path: '^src/domain/science' },
      to: { path: '^src/domain/world' },
    },
    {
      name: 'world-and-science-isolated',
      comment: 'world and science must never import each other (ARCHITECTURE.md §4)',
      severity: 'error',
      from: { path: '^src/domain/world' },
      to: { path: '^src/domain/science' },
    },
    {
      name: 'math-must-not-import-other-subjects',
      comment: 'math must never import science or world (ARCHITECTURE.md §4)',
      severity: 'error',
      from: { path: '^src/domain/math' },
      to: { path: '^src/domain/(science|world)' },
    },
    {
      name: 'subjects-must-import-math-via-index-only',
      comment:
        'science and world may import math only via its public index.ts (ARCHITECTURE.md §4)',
      severity: 'error',
      from: { path: '^src/domain/(science|world)' },
      to: {
        path: '^src/domain/math',
        pathNot: '^src/domain/math/index\\.ts$',
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
  },
};
