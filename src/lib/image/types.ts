export interface Rect {
  /** All values normalised to 0–1 of the rotated image. */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Point {
  x: number;
  y: number;
}

/** Four corners (top-left, top-right, bottom-right, bottom-left), normalised 0–1. */
export type Quad = [Point, Point, Point, Point];

export interface Adjustments {
  /** Quarter turns: 0, 90, 180, 270. */
  rotate: number;
  /**
   * Fine rotation in degrees, −15…15. When 0 and `auto` is on, detected skew
   * is corrected automatically.
   */
  angle: number;
  crop: Rect | null;
  quad: Quad | null;
  /** −100…100 */
  brightness: number;
  /** −100…100 */
  contrast: number;
  /** 0…100 */
  sharpen: number;
  grayscale: boolean;
  invert: boolean;
  /** Stretch the tonal range so the darkest ink is black and paper is white. */
  stretch: boolean;
  /** Pure black & white (thresholded). */
  bw: boolean;
  /** Even out lighting and shadows from phone photos. */
  flatten: boolean;
  denoise: boolean;
  /** Let the analyser choose the steps above. */
  auto: boolean;
}

export const DEFAULT_ADJUSTMENTS: Adjustments = {
  rotate: 0,
  angle: 0,
  crop: null,
  quad: null,
  brightness: 0,
  contrast: 0,
  sharpen: 0,
  grayscale: false,
  invert: false,
  stretch: false,
  bw: false,
  flatten: false,
  denoise: false,
  auto: true,
};

export interface ImageAnalysis {
  width: number;
  height: number;
  /** Mean luminance 0–255. */
  mean: number;
  p2: number;
  p98: number;
  /** Light text on a dark background (dark-mode screenshots, chalkboards). */
  darkBackground: boolean;
  lowContrast: boolean;
  /** Paper brightness varies across the image (shadows, vignetting). */
  uneven: boolean;
  /** Share of pixels in a handful of exact colours — high for screenshots. */
  flatRatio: number;
  likelyScreenshot: boolean;
  likelyPhoto: boolean;
  /** Estimated median glyph height in source pixels, if measurable. */
  textHeight: number | null;
  /** Estimated skew in degrees. */
  skew: number;
  /**
   * Coarse grid of cells that look like text ink, in the page's unrotated
   * coordinates (`ink.width` × `ink.height`). Used to notice text the OCR
   * engine skipped.
   */
  ink: { cols: number; rows: number; width: number; height: number; cells: Uint8Array };
}

/** The concrete steps the pipeline ran, after resolving `auto`. */
export interface ResolvedSteps {
  angle: number;
  grayscale: boolean;
  invert: boolean;
  flatten: boolean;
  stretch: boolean;
  bw: boolean;
  denoise: boolean;
  sharpen: number;
  brightness: number;
  contrast: number;
  scale: number;
}

export function geometryKey(a: Adjustments): string {
  return JSON.stringify([a.rotate, a.angle, a.crop, a.quad]);
}

export function isDefaultTone(a: Adjustments): boolean {
  return (
    !a.auto &&
    a.brightness === 0 &&
    a.contrast === 0 &&
    a.sharpen === 0 &&
    !a.grayscale &&
    !a.invert &&
    !a.stretch &&
    !a.bw &&
    !a.flatten &&
    !a.denoise
  );
}
