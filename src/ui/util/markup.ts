/**
 * Dictionary text helpers. markupLine renders a line with the two inline marks used by Spot-the-mistake equations
 * (`<s>…</s>` struck, `<r>…</r>` highlighted) as DOM nodes, never as HTML.
 */

import { el } from './dom';

const MARK = /<(s|r)>([\s\S]*?)<\/\1>/g;

/* A glossary term inside Bodha text: [[term-id|shown word]]. */
export const TERM_REGEX = /\[\[([\w.-]+)\|([^\]]+)\]\]/g;

export function plainText(str: string): string {
  return str
    .replace(TERM_REGEX, (_match, _id: string, shown: string) => shown)
    .replace(/<\/?[sr]>/g, '');
}

export function markupLine(str: string, cls = 'eq'): HTMLElement {
  const line = el('div', { class: cls });
  let last = 0;
  for (const m of str.matchAll(MARK)) {
    const at = m.index ?? 0;
    if (at > last) line.appendChild(document.createTextNode(str.slice(last, at)));
    line.appendChild(
      m[1] === 's' ? el('s', { text: m[2] }) : el('span', { class: 'r', text: m[2] })
    );
    last = at + m[0].length;
  }
  if (last < str.length) line.appendChild(document.createTextNode(str.slice(last)));
  return line;
}
