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

/** A paragraph whose [[id|word]] terms are buttons that call `onTerm`. */
export function richPara(
  str: string,
  onTerm: (id: string, shown: string) => void,
  cls = 'bodha-text'
): HTMLElement {
  const p = el('p', { class: cls });
  let lastIndex = 0;

  str.replace(TERM_REGEX, (match, id: string, shown: string, offset: number) => {
    if (offset > lastIndex) {
      p.appendChild(document.createTextNode(str.slice(lastIndex, offset)));
    }
    const termBtn = el('button', {
      class: 'term',
      type: 'button',
      text: shown,
      onclick: () => onTerm(id, shown),
    });
    p.appendChild(termBtn);
    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < str.length) {
    p.appendChild(document.createTextNode(str.slice(lastIndex)));
  }

  return p;
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
