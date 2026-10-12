import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import ts from 'typescript';

/* FR-001: the UI renders only dictionary text. Static strings shown to the child (text, labels,
   SVG text, textContent) may hold numbers, symbols, single letters and unit symbols, never words.
   TEXT_CALLS are the SVG text helpers; their third argument is the shown string. */

const ROOT = join(process.cwd(), 'src/ui');
const TEXT_PROPS = new Set([
  'text',
  'aria-label',
  'ariaLabel',
  'title',
  'placeholder',
  'alt',
  'label',
]);
const TEXT_CALLS = new Set(['figText', 'text', 'createText']);
const ALLOWED_WORD = /^(?:[A-Za-z]|[IVXLCDM]+|cm|mm|km|kg|mg|ml|mL|AM|PM)$/;

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return files(p);
    return p.endsWith('.ts') && !p.endsWith('.test.ts') ? [p] : [];
  });
}

function staticText(node: ts.Node): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) {
    return [node.head.text, ...node.templateSpans.map((s) => s.literal.text)].join(' ');
  }
  if (ts.isParenthesizedExpression(node)) return staticText(node.expression);
  if (
    ts.isBinaryExpression(node) &&
    (node.operatorToken.kind === ts.SyntaxKind.PlusToken ||
      node.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
      node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)
  ) {
    return [staticText(node.left), staticText(node.right)].filter(Boolean).join(' ');
  }
  if (ts.isConditionalExpression(node)) {
    return [staticText(node.whenTrue), staticText(node.whenFalse)].filter(Boolean).join(' ');
  }
  return null;
}

const DICTIONARY_KEY = /^[a-z][\w-]*(?:\.[\w-]+)+$/;

function hasWords(s: string | null): boolean {
  if (!s || DICTIONARY_KEY.test(s.trim())) return false;
  const words = s.match(/[A-Za-z]+/g) || [];
  return words.some((w) => !ALLOWED_WORD.test(w));
}

/* A static SVG icon string carries no words between its tags. */
function isStaticIcon(node: ts.Node): boolean {
  const s = ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) ? node.text : null;
  return !!s && s.trim().startsWith('<svg') && !/>[^<]*[A-Za-z]{2,}[^<]*</.test(s);
}

function propName(name: ts.PropertyName): string {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  return '';
}

function scan(file: string): string[] {
  const src = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const found: string[] = [];
  const where = (n: ts.Node) =>
    `${relative(process.cwd(), file)}:${src.getLineAndCharacterOfPosition(n.getStart()).line + 1}`;

  const visit = (n: ts.Node): void => {
    if (ts.isPropertyAssignment(n)) {
      const name = propName(n.name);
      if (name === 'html' && !isStaticIcon(n.initializer)) found.push(`${where(n)} html: property`);
      if (TEXT_PROPS.has(name) && hasWords(staticText(n.initializer))) {
        found.push(`${where(n)} ${name}: ${n.initializer.getText().slice(0, 60)}`);
      }
    }
    if (
      ts.isBinaryExpression(n) &&
      n.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isPropertyAccessExpression(n.left)
    ) {
      const prop = n.left.name.text;
      const value = staticText(n.right);
      if (prop === 'innerHTML' && value !== '' && !isStaticIcon(n.right)) {
        found.push(`${where(n)} innerHTML`);
      }
      if ((prop === 'textContent' || prop === 'innerText') && hasWords(value)) {
        found.push(`${where(n)} ${prop}: ${n.right.getText().slice(0, 60)}`);
      }
    }
    if (ts.isCallExpression(n)) {
      const callee = ts.isIdentifier(n.expression)
        ? n.expression.text
        : ts.isPropertyAccessExpression(n.expression)
          ? n.expression.name.text
          : '';
      const shown = TEXT_CALLS.has(callee) ? n.arguments[2] : undefined;
      if (shown && hasWords(staticText(shown))) {
        found.push(`${where(shown)} ${callee}(${shown.getText().slice(0, 50)})`);
      }
      const childText =
        callee === 'createTextNode'
          ? [n.arguments[0]]
          : callee === 'el' && n.arguments[2]
            ? ts.isArrayLiteralExpression(n.arguments[2])
              ? [...n.arguments[2].elements]
              : [n.arguments[2]]
            : [];
      for (const child of childText) {
        if (child && hasWords(staticText(child))) {
          found.push(`${where(child)} ${callee} child: ${child.getText().slice(0, 50)}`);
        }
      }
      if (callee === 'setAttribute' && n.arguments.length === 2) {
        const [attr, value] = n.arguments;
        const name = attr ? staticText(attr) : null;
        if (name && TEXT_PROPS.has(name) && value && hasWords(staticText(value))) {
          found.push(`${where(n)} setAttribute(${name})`);
        }
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(src);
  return found;
}

describe('046 UI layer shows only dictionary text (FR-001)', () => {
  it('has no hard-coded English and no innerHTML/html: in src/ui', () => {
    const violations = files(ROOT).flatMap(scan);
    expect(violations, `${violations.length} violations:\n${violations.join('\n')}`).toEqual([]);
  });
});
