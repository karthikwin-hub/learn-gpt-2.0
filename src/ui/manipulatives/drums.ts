/**
 * Two Drummers manipulative.
 * Renders two tala cycles played along a shared beat line with real-time sound, dial hands, and LCM highlights.
 */

import { lcm } from '../../domain/math/multiply';
import { voice } from '../components/voice/voice';

export interface DrumsOptions {
  a: number;
  b: number;
  describe?: (a: number, b: number) => string;
  onBeat?: (n: number, hitA: boolean, hitB: boolean) => void;
  onEnd?: () => void;
  reducedMotion?: boolean;
}

export interface DrumsInstance {
  node: SVGSVGElement;
  setA: (n: number) => void;
  setB: (n: number) => void;
  play: () => void;
  stop: () => void;
  reset: () => void;
  playing: () => boolean;
  destroy: () => void;
}

interface RingData {
  g: SVGGElement;
  dots: SVGCircleElement[];
  hand: SVGLineElement;
  n: number;
  colour: string;
}

const W = 360;
const PER_ROW = 24;

export function drums(opts: DrumsOptions): DrumsInstance {
  let a = opts.a;
  let b = opts.b;
  let beat = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const pulseTimers: Array<ReturnType<typeof setTimeout>> = [];

  const root = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  root.setAttribute('role', 'img');

  const ringLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const lineLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const markLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  root.appendChild(ringLayer);
  root.appendChild(lineLayer);
  root.appendChild(markLayer);

  let ringA: RingData | null = null;
  let ringB: RingData | null = null;

  function getLength(): number {
    const l = lcm(a, b);
    return Math.min(72, Math.max(24, Math.ceil(l / 12) * 12));
  }

  function beatXY(n: number): { x: number; y: number } {
    const row = Math.floor((n - 1) / PER_ROW);
    const col = (n - 1) % PER_ROW;
    const gap = (W - 36) / (PER_ROW - 1);
    return { x: 18 + col * gap, y: 196 + row * 62 };
  }

  function createRing(cx: number, n: number, colour: string, label: string): RingData {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${cx},84)`);

    const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bgCircle.setAttribute('r', '58');
    bgCircle.setAttribute('fill', 'none');
    bgCircle.setAttribute('stroke', 'var(--hair)');
    bgCircle.setAttribute('stroke-width', '2');
    g.appendChild(bgCircle);

    const dots: SVGCircleElement[] = [];
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + (2 * Math.PI * i) / n;
      const isHit = i === n - 1;
      const d = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      d.setAttribute('cx', String(58 * Math.cos(ang)));
      d.setAttribute('cy', String(58 * Math.sin(ang)));
      d.setAttribute('r', isHit ? '10' : '5.5');
      d.setAttribute('fill', isHit ? colour : 'var(--paper-raised)');
      d.setAttribute('stroke', colour);
      d.setAttribute('stroke-width', '2');
      g.appendChild(d);
      dots.push(d);
    }

    const hand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    hand.setAttribute('x1', '0');
    hand.setAttribute('y1', '0');
    hand.setAttribute('x2', '0');
    hand.setAttribute('y2', '-44');
    hand.setAttribute('stroke', 'var(--ink)');
    hand.setAttribute('stroke-width', '2.5');
    hand.setAttribute('stroke-linecap', 'round');
    g.appendChild(hand);

    const centerPin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centerPin.setAttribute('r', '4');
    centerPin.setAttribute('fill', 'var(--ink)');
    g.appendChild(centerPin);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('y', '4');
    text.setAttribute('dy', '24');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '26');
    text.setAttribute('font-weight', '600');
    text.setAttribute('fill', colour);
    text.setAttribute('font-family', 'var(--font)');
    text.textContent = label;
    g.appendChild(text);

    ringLayer.appendChild(g);
    return { g, dots, hand, n, colour };
  }

  function pointRing(r: RingData, k: number): void {
    const idx = (k - 1 + r.n) % r.n;
    const ang = (360 * idx) / r.n;
    r.hand.setAttribute('transform', `rotate(${ang})`);
    r.dots.forEach((d, i) => {
      d.setAttribute('opacity', i === idx || k === 0 ? '1' : '0.55');
    });
  }

  function pulse(r: RingData): void {
    const hit = r.dots[r.n - 1];
    if (!hit) return;
    hit.setAttribute('r', '15');
    const pt = setTimeout(() => {
      hit.setAttribute('r', '10');
    }, 160);
    pulseTimers.push(pt);
    if (pulseTimers.length > 8) {
      pulseTimers.shift();
    }
  }

  function mark(n: number, hitA: boolean, hitB: boolean): void {
    const p = beatXY(n);
    if (hitA) {
      const cA = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      cA.setAttribute('cx', String(p.x));
      cA.setAttribute('cy', String(p.y - 11));
      cA.setAttribute('r', '4.5');
      cA.setAttribute('fill', 'var(--indigo)');
      markLayer.appendChild(cA);
    }
    if (hitB) {
      const cB = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      cB.setAttribute('cx', String(p.x));
      cB.setAttribute('cy', String(p.y + 11));
      cB.setAttribute('r', '4.5');
      cB.setAttribute('fill', 'var(--teal)');
      markLayer.appendChild(cB);
    }
    if (hitA && hitB) {
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('cx', String(p.x));
      ring.setAttribute('cy', String(p.y));
      ring.setAttribute('r', '17');
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', 'var(--thread)');
      ring.setAttribute('stroke-width', '2.5');
      markLayer.appendChild(ring);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', String(p.x));
      label.setAttribute('y', String(p.y - 26));
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', '13');
      label.setAttribute('font-weight', '600');
      label.setAttribute('fill', 'var(--ink)');
      label.setAttribute('font-family', 'var(--font)');
      label.textContent = String(n);
      markLayer.appendChild(label);
    }
  }

  function build(): void {
    stop();
    beat = 0;
    while (ringLayer.firstChild) ringLayer.removeChild(ringLayer.firstChild);
    while (lineLayer.firstChild) lineLayer.removeChild(lineLayer.firstChild);
    while (markLayer.firstChild) markLayer.removeChild(markLayer.firstChild);

    ringA = createRing(96, a, 'var(--indigo)', String(a));
    ringB = createRing(264, b, 'var(--teal)', String(b));
    pointRing(ringA, 0);
    pointRing(ringB, 0);

    const N = getLength();
    const rows = Math.ceil(N / PER_ROW);
    root.setAttribute('viewBox', `0 0 ${W} ${196 + rows * 62 - 10}`);

    for (let n = 1; n <= N; n++) {
      const p = beatXY(n);
      const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tick.setAttribute('x1', String(p.x));
      tick.setAttribute('y1', String(p.y - 4));
      tick.setAttribute('x2', String(p.x));
      tick.setAttribute('y2', String(p.y + 4));
      tick.setAttribute('stroke', 'var(--ghost)');
      tick.setAttribute('stroke-width', '1.5');
      lineLayer.appendChild(tick);

      if (n % 6 === 0) {
        const numText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        numText.setAttribute('x', String(p.x));
        numText.setAttribute('y', String(p.y + 24));
        numText.setAttribute('text-anchor', 'middle');
        numText.setAttribute('font-size', '10');
        numText.setAttribute('fill', 'var(--ink-soft)');
        numText.setAttribute('font-family', 'var(--font)');
        numText.textContent = String(n);
        lineLayer.appendChild(numText);
      }
    }

    for (let r = 0; r < rows; r++) {
      const s = beatXY(r * PER_ROW + 1);
      const e = beatXY(Math.min(N, (r + 1) * PER_ROW));
      const baseline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      baseline.setAttribute('x1', String(s.x - 6));
      baseline.setAttribute('y1', String(s.y));
      baseline.setAttribute('x2', String(e.x + 6));
      baseline.setAttribute('y2', String(e.y));
      baseline.setAttribute('stroke', 'var(--hair)');
      baseline.setAttribute('stroke-width', '1.5');
      lineLayer.appendChild(baseline);
    }

    if (opts.describe) {
      root.setAttribute('aria-label', opts.describe(a, b));
    }
  }

  function step(): void {
    const N = getLength();
    beat++;
    const hitA = beat % a === 0;
    const hitB = beat % b === 0;

    if (ringA) pointRing(ringA, beat);
    if (ringB) pointRing(ringB, beat);

    if (hitA && ringA) {
      pulse(ringA);
      voice.tone('low');
    }
    if (hitB && ringB) {
      pulse(ringB);
      if (hitA) {
        setTimeout(() => voice.tone('high'), 30);
      } else {
        voice.tone('high');
      }
    }

    mark(beat, hitA, hitB);

    if (opts.onBeat) {
      opts.onBeat(beat, hitA, hitB);
    }

    if (beat >= N) {
      stop();
      if (opts.onEnd) {
        opts.onEnd();
      }
      return;
    }

    const delay = opts.reducedMotion ? 120 : 360;
    timer = setTimeout(step, delay);
  }

  function play(): void {
    if (timer) return;
    if (beat >= getLength()) {
      build();
    }
    step();
  }

  function stop(): void {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  build();

  return {
    node: root,
    setA(n: number): void {
      a = n;
      build();
    },
    setB(n: number): void {
      b = n;
      build();
    },
    play,
    stop,
    reset: build,
    playing(): boolean {
      return timer !== null;
    },
    destroy(): void {
      stop();
      pulseTimers.forEach(clearTimeout);
    },
  };
}
