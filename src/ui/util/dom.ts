/**
 * DOM and SVG construction helpers.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

export interface Attrs {
  text?: string;
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

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function svgPoint(
  svgEl: SVGSVGElement,
  evt: PointerEvent | MouseEvent
): { x: number; y: number } {
  const pt = svgEl.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  const m = svgEl.getScreenCTM();
  return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 };
}

export interface DragHandlers {
  start?: (e: PointerEvent) => void;
  move?: (e: PointerEvent) => void;
  end?: (e: PointerEvent) => void;
}

export function drag(target: Element, handlers: DragHandlers): () => void {
  let activeId: number | null = null;

  function down(e: PointerEvent) {
    if (activeId !== null) return;
    activeId = e.pointerId;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {
      // capture unsupported
    }
    e.preventDefault();
    if (handlers.start) handlers.start(e);
  }

  function move(e: PointerEvent) {
    if (e.pointerId !== activeId) return;
    e.preventDefault();
    if (handlers.move) handlers.move(e);
  }

  function up(e: PointerEvent) {
    if (e.pointerId !== activeId) return;
    activeId = null;
    if (handlers.end) handlers.end(e);
  }

  target.addEventListener('pointerdown', down as EventListener);
  target.addEventListener('pointermove', move as EventListener);
  target.addEventListener('pointerup', up as EventListener);
  target.addEventListener('pointercancel', up as EventListener);

  return function off() {
    target.removeEventListener('pointerdown', down as EventListener);
    target.removeEventListener('pointermove', move as EventListener);
    target.removeEventListener('pointerup', up as EventListener);
    target.removeEventListener('pointercancel', up as EventListener);
  };
}

export interface StepperOptions {
  value: number;
  min: number;
  max: number;
  label: string;
  minusLabel?: string;
  plusLabel?: string;
  onChange?: (v: number) => void;
}

export interface StepperResult {
  node: HTMLElement;
  set: (v: number, silent?: boolean) => void;
}

export function createStepper(opts: StepperOptions): StepperResult {
  let value = opts.value;
  const out = el('output', { 'aria-live': 'polite', text: String(value) });

  function set(v: number, silent = false) {
    value = clamp(v, opts.min, opts.max);
    out.textContent = String(value);
    if (!silent && opts.onChange) {
      opts.onChange(value);
    }
  }

  const node = el('div', { class: 'stepper', role: 'group', 'aria-label': opts.label }, [
    el('span', { class: 'stepper-label', text: opts.label }),
    el('button', {
      type: 'button',
      'aria-label': opts.minusLabel || '−',
      text: '−',
      onclick: () => set(value - 1),
    }),
    out,
    el('button', {
      type: 'button',
      'aria-label': opts.plusLabel || '+',
      text: '+',
      onclick: () => set(value + 1),
    }),
  ]);

  return {
    node,
    set: (v: number) => set(v, true),
  };
}

export function reducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Runs fn(progress 0..1) over duration ms; returns a cancel function.
 */
export function tween(duration: number, fn: (p: number) => void, done?: () => void): () => void {
  if (reducedMotion()) duration = 1;
  let start: number | null = null;
  let id = 0;
  let cancelled = false;
  function frame(ts: number) {
    if (cancelled) return;
    if (start === null) start = ts;
    const p = clamp((ts - start) / duration, 0, 1);
    fn(p);
    if (p < 1) {
      id = requestAnimationFrame(frame);
    } else if (done) {
      done();
    }
  }
  id = requestAnimationFrame(frame);
  return function cancel() {
    cancelled = true;
    cancelAnimationFrame(id);
  };
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
