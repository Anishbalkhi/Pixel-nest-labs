// The Pixel Nest mark, measured from public/logo.webp. Coordinates are the
// centre of each square, relative to the mark's vertical axis (x = 0) and its
// top row (y = 0). The left half is listed once and mirrored.

export const PIXEL = 52;
export const SUN = 88;
export const VIEWBOX = "-320 -40 640 480";

const B = "#0b4fb5";
const B2 = "#0a5bae";
const M = "#0e76a6";
const TM = "#149c9f";
const T = "#1fb89a";
export const SUN_COLOR = "#f7a21b";

type Half = [x: number, y: number, color: string][];

const leftHalf: Half = [
  [-217, 0, B],
  [-280, 70, B],
  [-217, 70, B],
  [-152, 70, B],
  [-280, 138, B2],
  [-217, 138, B2],
  [-152, 138, B2],
  [-214, 206, B2],
  [-147, 206, T],
  [-80, 206, M],
  [-212, 273, M],
  [-144, 273, T],
  [-72, 273, TM],
  [-141, 340, T],
  [-72, 340, T],
  [-68, 400, T],
];

const centre: Half = [
  [0, 273, TM],
  [0, 340, T],
  [0, 400, T],
];

export type Pixel = { x: number; y: number; color: string; size: number };

export const markPixels: Pixel[] = [
  ...leftHalf,
  ...leftHalf.map(([x, y, c]) => [-x, y, c] as Half[number]),
  ...centre,
].map(([x, y, color]) => ({ x, y, color, size: PIXEL }));

export const sunPixel: Pixel = { x: 0, y: 152, color: SUN_COLOR, size: SUN };

/** Deterministic pseudo-random number in [0, 1) so server and client agree. */
export function seeded(n: number) {
  const s = Math.sin(n * 9301 + 49297) * 233280;
  return s - Math.floor(s);
}
