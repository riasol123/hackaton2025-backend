import { TRILATERATION_EPSILON } from "src/constants";


type Anchor2D = { x: number; y: number };

// Конвертирует RSSI в расстояние по модели логарифмического затухания
export function rssiToDistance(
  rssi: number,
  rssiAtOneMeter: number,
  pathLossExponent: number,
): number {
  return Math.pow(10, (rssiAtOneMeter - rssi) / (10 * pathLossExponent));
}

// Трилатерация по 3 точкам и 3 радиусам
export function trilaterate(
  anchors: [Anchor2D, Anchor2D, Anchor2D],
  distances: [number, number, number],
): { x: number; y: number } | null {
  const [p1, p2, p3] = anchors;
  const [r1, r2, r3] = distances;

  const A = 2 * (p2.x - p1.x);
  const B = 2 * (p2.y - p1.y);
  const C =
    r1 ** 2 -
    r2 ** 2 +
    p2.x ** 2 -
    p1.x ** 2 +
    p2.y ** 2 -
    p1.y ** 2;

  const D = 2 * (p3.x - p1.x);
  const E = 2 * (p3.y - p1.y);
  const F =
    r1 ** 2 -
    r3 ** 2 +
    p3.x ** 2 -
    p1.x ** 2 +
    p3.y ** 2 -
    p1.y ** 2;

  const denominator = A * E - B * D;
  if (Math.abs(denominator) < TRILATERATION_EPSILON) return null;

  const x = (C * E - B * F) / denominator;
  const y = (A * F - C * D) / denominator;

  return isFinite(x) && isFinite(y) ? { x, y } : null;
}