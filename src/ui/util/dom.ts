/**
 * DOM and SVG construction helpers.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

export interface Attrs {
  text?: string;
  html?: string;
  class?: string;
  style?: Partial<CSSStyleDeclaration> | Record<string, string>;
  role?: string;
  type?: string;
  lang?: string;
  id?: string;
  hidden?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-checked'?: string;
  'aria-pressed'?: string;
  'aria-expanded'?: string;
  'aria-haspopup'?: string;
  'aria-controls'?: string;
  'data-value'?: string;
  [key: string]: unknown;
}

export type Child = HTMLElement | SVGElement | Text | string | number | null | undefined | false;

export function applyAttrs(node: Element, attrs?: Attrs): void {
  if (!attrs) return;
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'text') {
      node.textContent = String(v);
    } else if (k === 'html') {
      node.innerHTML = String(v);
    } else if (k === 'class') {
      node.setAttribute('class', String(v));
    } else if (k === 'style' && typeof v === 'object' && node instanceof HTMLElement) {
      Object.assign(node.style, v);
    } else if (k.startsWith('on') && typeof v === 'function') {
      node.addEventListener(k.slice(2).toLowerCase(), v as EventListener);
    } else {
      node.setAttribute(k, v === true ? '' : String(v));
    }
  }
}

export function append(node: Element, children?: Child | Child[]): void {
  if (children === undefined || children === null) return;
  const list = Array.isArray(children) ? children : [children];
  for (const c of list) {
    if (c === null || c === undefined || c === false) continue;
    if (typeof c === 'string' || typeof c === 'number') {
      node.appendChild(document.createTextNode(String(c)));
    } else {
      node.appendChild(c);
    }
  }
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Attrs,
  children?: Child | Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  applyAttrs(node, attrs);
  if (children !== undefined) append(node, children);
  return node;
}

export function svg<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs?: Attrs,
  children?: Child | Child[]
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, tag);
  applyAttrs(node, attrs);
  if (children !== undefined) append(node, children);
  return node;
}

export function clear(node: Element): void {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function reducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export function toast(msg: string, ms = 2600): void {
  const node = document.getElementById('toast');
  if (!node) return;
  node.textContent = msg;
  node.hidden = false;
  node.classList.add('visible');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    node.hidden = true;
    node.classList.remove('visible');
  }, ms);
}
