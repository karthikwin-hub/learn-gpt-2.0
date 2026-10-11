/**
 * Kolam Mirror manipulative (G4).
 * Draw on dark ground with rice-white lines; each stroke is repeated by a symmetry group.
 * 'mirror' mode = dihedral group D_n (reflections + rotations).
 * 'turn' mode = cyclic group C_n (rotations only).
 * Strokes stored in normalized coordinates [-1, 1] relative to center.
 */

import {
  mirrorLineAngles,
  symmetryTransforms,
  type Point2D,
  type SymmetryMode,
  type Transform2D,
} from '../../domain/math/geometry';
import { el, tween } from '../util/dom';

const DEMO: Point2D[] = [];
for (let i = 0; i <= 40; i++) {
  const t = i / 40;
  DEMO.push({
    x: 0.12 + 0.55 * t,
    y: -0.06 - 0.32 * Math.sin(Math.PI * t) + 0.05 * Math.sin(3 * Math.PI * t),
  });
}

export interface KolamOptions {
  order?: number;
  mode?: SymmetryMode;
  strokes?: Point2D[][];
  describe?: (order: number, mode: SymmetryMode, count: number) => string;
  onChange?: (strokes: Point2D[][]) => void;
}

export interface KolamManipulative {
  node: HTMLCanvasElement;
  setOrder: (order: number) => void;
  setMode: (mode: SymmetryMode) => void;
  undo: () => void;
  clear: () => void;
  demo: () => void;
  strokes: () => Point2D[][];
  destroy: () => void;
}

export function createKolamManipulative(opts: KolamOptions): KolamManipulative {
  let order = opts.order ?? 4;
  let mode: SymmetryMode = opts.mode ?? 'mirror';
  const strokes: Point2D[][] = opts.strokes ? opts.strokes.map((s) => [...s]) : [];
  let live: Point2D[] | null = null;
  const canvas = el('canvas', { class: 'kolam-canvas', role: 'img' });
  const ctx = canvas.getContext('2d');
  let size = 0;
  let dpr = 1;
  let cancelDemo: (() => void) | null = null;

  function css(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function resize(): void {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width) return;
    dpr = window.devicePixelRatio || 1;
    size = rect.width;
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    render();
  }

  function toPx(p: Point2D): Point2D {
    return {
      x: ((p.x + 1) * size) / 2,
      y: ((p.y + 1) * size) / 2,
    };
  }

  function drawStroke(pts: Point2D[], transforms: Transform2D[]): void {
    if (!ctx || pts.length < 2) return;
    transforms.forEach((T) => {
      ctx.beginPath();
      const first = pts[0];
      if (!first) return;
      const a = toPx(T(first));
      ctx.moveTo(a.x, a.y);
      for (let i = 1; i < pts.length - 1; i++) {
        const curr = pts[i];
        const next = pts[i + 1];
        if (!curr || !next) continue;
        const p = toPx(T(curr));
        const q = toPx(T(next));
        ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
      }
      const last = pts[pts.length - 1];
      if (!last) return;
      const z = toPx(T(last));
      ctx.lineTo(z.x, z.y);
      ctx.stroke();
    });
  }

  function render(): void {
    if (!ctx || !size) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const ground = css('--ground') || '#2A2723';
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, size, size);

    const rice = css('--rice') || '#F3EBDD';

    // 7x7 dot pulli grid
    ctx.fillStyle = rice;
    ctx.globalAlpha = 0.55;
    const n = 7;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const p = toPx({
          x: -0.84 + (1.68 * i) / (n - 1),
          y: -0.84 + (1.68 * j) / (n - 1),
        });
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Mirror lines / rotation markers
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = css('--thread') || '#E0A030';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);

    if (mode === 'mirror') {
      mirrorLineAngles(order).forEach((a) => {
        const c = Math.cos(a);
        const s = Math.sin(a);
        const p1 = toPx({ x: -c * 1.2, y: -s * 1.2 });
        const p2 = toPx({ x: c * 1.2, y: s * 1.2 });
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });
    }

    ctx.setLineDash([]);
    if (order > 1) {
      const c0 = toPx({ x: 0, y: 0 });
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(c0.x, c0.y, 14, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI) / order);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(c0.x, c0.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = css('--thread') || '#E0A030';
      ctx.fill();
    }

    // Rice strokes
    ctx.globalAlpha = 1;
    ctx.strokeStyle = rice;
    ctx.lineWidth = 3.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const transforms = symmetryTransforms(order, mode);
    strokes.forEach((s) => {
      drawStroke(s, transforms);
    });
    if (live) {
      drawStroke(live, transforms);
    }

    if (opts.describe) {
      canvas.setAttribute('aria-label', opts.describe(order, mode, strokes.length));
    }
  }

  function norm(e: PointerEvent | MouseEvent): Point2D {
    const r = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
    };
  }

  let activePointerId: number | null = null;

  function onPointerDown(e: PointerEvent) {
    if (activePointerId !== null) return;
    activePointerId = e.pointerId;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    if (cancelDemo) {
      cancelDemo();
      cancelDemo = null;
    }
    live = [norm(e)];
    render();
  }

  function onPointerMove(e: PointerEvent) {
    if (e.pointerId !== activePointerId || !live) return;
    const p = norm(e);
    const last = live[live.length - 1];
    if (last && Math.hypot(p.x - last.x, p.y - last.y) > 0.012) {
      live.push(p);
      render();
    }
  }

  function onPointerUp(e: PointerEvent) {
    if (e.pointerId !== activePointerId) return;
    activePointerId = null;
    if (live && live.length > 1) {
      strokes.push(live);
      if (opts.onChange) opts.onChange(strokes);
    }
    live = null;
    render();
  }

  canvas.addEventListener('pointerdown', onPointerDown as EventListener);
  canvas.addEventListener('pointermove', onPointerMove as EventListener);
  canvas.addEventListener('pointerup', onPointerUp as EventListener);
  canvas.addEventListener('pointercancel', onPointerUp as EventListener);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  function demo(): void {
    live = [];
    cancelDemo = tween(
      1500,
      (p) => {
        live = DEMO.slice(0, Math.max(2, Math.round(p * DEMO.length)));
        render();
      },
      () => {
        strokes.push([...DEMO]);
        live = null;
        cancelDemo = null;
        render();
        if (opts.onChange) opts.onChange(strokes);
      }
    );
  }

  return {
    node: canvas,
    setOrder: (o: number) => {
      order = o;
      render();
    },
    setMode: (m: SymmetryMode) => {
      mode = m;
      render();
    },
    undo: () => {
      strokes.pop();
      render();
      if (opts.onChange) opts.onChange(strokes);
    },
    clear: () => {
      strokes.length = 0;
      render();
      if (opts.onChange) opts.onChange(strokes);
    },
    demo,
    strokes: () => strokes,
    destroy: () => {
      canvas.removeEventListener('pointerdown', onPointerDown as EventListener);
      canvas.removeEventListener('pointermove', onPointerMove as EventListener);
      canvas.removeEventListener('pointerup', onPointerUp as EventListener);
      canvas.removeEventListener('pointercancel', onPointerUp as EventListener);
      ro.disconnect();
      if (cancelDemo) cancelDemo();
    },
  };
}
