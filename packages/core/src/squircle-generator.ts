interface PaintGlobalScope {
  registerPaint(name: string, ctor: unknown): void;
}

interface Geometry {
  readonly width: number;
  readonly height: number;
}

interface StyleMap {
  get(prop: string): CSSStyleValue;
}

interface Painter {
  paint(ctx: CanvasRenderingContext2D, geom: Geometry, props: StyleMap): void;
}

declare const registerPaint: PaintGlobalScope['registerPaint'];

/**
 * Draws a squircle shape on the given canvas context,
 * filling with fillColor and stroking with strokeColor.
 */
function renderSquircle(
  ctx: CanvasRenderingContext2D,
  geom: Geometry,
  cornerRadii: [number, number, number, number],
  cornerSmooth: [number, number, number, number],
  borderWidth: number,
  fillColor: string,
  strokeColor: string,
  isMask: boolean,
): void {
  const halfBorder = borderWidth / 2;
  const [tl, tr, br, bl] = cornerRadii;
  const [tlSmooth, trSmooth, brSmooth, blSmooth] = cornerSmooth;
  ctx.beginPath();
  // Top right corner
  ctx.moveTo(tl, halfBorder);
  ctx.lineTo(geom.width - tr, halfBorder);
  ctx.bezierCurveTo(
    geom.width - tr / trSmooth,
    halfBorder,
    geom.width - halfBorder,
    tr / trSmooth,
    geom.width - halfBorder,
    tr,
  );
  // Bottom right corner
  ctx.lineTo(geom.width - halfBorder, geom.height - br);
  ctx.bezierCurveTo(
    geom.width - halfBorder,
    geom.height - br / brSmooth,
    geom.width - br / brSmooth,
    geom.height - halfBorder,
    geom.width - br,
    geom.height - halfBorder,
  );
  // Bottom left corner
  ctx.lineTo(bl, geom.height - halfBorder);
  ctx.bezierCurveTo(
    bl / blSmooth,
    geom.height - halfBorder,
    halfBorder,
    geom.height - bl / blSmooth,
    halfBorder,
    geom.height - bl,
  );
  // Top left corner
  ctx.lineTo(halfBorder, tl);
  ctx.bezierCurveTo(
    halfBorder,
    tl / tlSmooth,
    tl / tlSmooth,
    halfBorder,
    tl,
    halfBorder,
  );
  ctx.closePath();

  if (isMask && borderWidth > 0) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
  } else if (isMask) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  } else {
    ctx.fillStyle = fillColor;
    ctx.fill();
    if (borderWidth > 0) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();
    }
  }
}

const BORDER_KEYS = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left',
] as const;

class SquirclePainter implements Painter {
  static get contextOptions() {
    return { alpha: true };
  }

  static get inputProperties(): string[] {
    // only custom properties can be read by the paint worklet
    return [
      '--squircle-border-radius',
      '--squircle-border-top-left-radius',
      '--squircle-border-top-right-radius',
      '--squircle-border-bottom-right-radius',
      '--squircle-border-bottom-left-radius',
      '--squircle-border-smoothing',
      '--squircle-border-top-left-smoothing',
      '--squircle-border-top-right-smoothing',
      '--squircle-border-bottom-right-smoothing',
      '--squircle-border-bottom-left-smoothing',
      '--squircle-border-width',
      '--squircle-border-color',
      '--squircle-background-color',
      '--squircle-mode',
    ];
  }

  paint(ctx: CanvasRenderingContext2D, geom: Geometry, props: StyleMap): void {
    const SMOOTH_BASE = 10;
    const DIST_RATIO = 1.8;

    // generic smoothing fallback
    const rawGlobalSmooth = props
      .get('--squircle-border-smoothing')!
      .toString();
    const defaultSmooth =
      parseFloat(rawGlobalSmooth) * SMOOTH_BASE || SMOOTH_BASE;

    // per-corner smoothing
    let cornerSmooth = BORDER_KEYS.map(
      (k) =>
        parseFloat(props.get(`--squircle-border-${k}-smoothing`)!.toString()) *
        SMOOTH_BASE,
    ) as [number, number, number, number];

    // fallback sur le global si NaN
    cornerSmooth = cornerSmooth.map((s) =>
      Number.isNaN(s) ? defaultSmooth : s,
    ) as [number, number, number, number];

    // read per-corner radii
    let cornerRadii = BORDER_KEYS.map(
      (k) =>
        parseFloat(props.get(`--squircle-border-${k}-radius`)!.toString()) *
        DIST_RATIO,
    ) as [number, number, number, number];

    // fallback shorthand expansion if any is NaN
    if (cornerRadii.some((r) => Number.isNaN(r))) {
      const raw = props.get('--squircle-border-radius')!.toString();
      const toks = (raw.match(/\d+(\.\d+)?/g) || []).map(
        (n) => parseFloat(n) * DIST_RATIO,
      );

      let tl = toks[0] ?? 0;
      let tr = toks[1] ?? tl;
      let br = toks[2] ?? tl;
      let bl = toks[3] ?? tr;
      if (toks.length === 1) tr = br = bl = tl;
      else if (toks.length === 2) (br = tl), (bl = tr);
      else if (toks.length === 3) bl = tr;

      cornerRadii = cornerRadii.map((r, i) =>
        Number.isNaN(r) ? [tl, tr, br, bl][i] : r,
      ) as [number, number, number, number];
    }

    // read border width & colours
    const borderWidth =
      parseFloat(props.get('--squircle-border-width')!.toString()) || 0;
    const fillColor = props.get('--squircle-background-color')!.toString();
    const strokeColor = props.get('--squircle-border-color')!.toString();

    // cap radii
    const maxR = Math.min(geom.width, geom.height) / 2;
    cornerRadii = cornerRadii.map((r) => Math.min(r, maxR)) as [
      number,
      number,
      number,
      number,
    ];

    const isMask = props.get('--squircle-mode')?.toString() === 'mask-image';

    renderSquircle(
      ctx,
      geom,
      cornerRadii,
      cornerSmooth,
      borderWidth,
      fillColor,
      strokeColor,
      isMask,
    );
  }
}

if (typeof registerPaint === 'function') {
  registerPaint('squircle', SquirclePainter);
}
