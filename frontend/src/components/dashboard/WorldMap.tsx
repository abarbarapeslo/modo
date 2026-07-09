import type { ReactNode } from "react";

export const MAP_W = 720;
export const MAP_H = 360;

/** Equirectangular projection: [lon, lat] → [x, y] on the 720×360 canvas. */
export function project([lon, lat]: [number, number]): [number, number] {
  return [((lon + 180) / 360) * MAP_W, ((90 - lat) / 180) * MAP_H];
}

// Deliberately simplified continent silhouettes (lon/lat) — a quiet,
// minimalist world rather than a cartographically precise one.
const CONTINENTS: [number, number][][] = [
  // North America
  [[-168, 66], [-140, 70], [-120, 72], [-95, 72], [-80, 73], [-70, 62], [-55, 52], [-65, 44], [-75, 35], [-81, 25], [-90, 20], [-97, 16], [-105, 20], [-115, 30], [-125, 40], [-130, 55], [-155, 58]],
  // South America
  [[-80, 9], [-72, 12], [-60, 8], [-50, 0], [-35, -8], [-40, -20], [-48, -28], [-58, -38], [-65, -47], [-70, -54], [-72, -45], [-73, -30], [-70, -18], [-77, -8]],
  // Europe
  [[-10, 36], [0, 38], [10, 38], [20, 36], [28, 36], [33, 45], [40, 48], [45, 55], [40, 65], [30, 70], [20, 70], [10, 64], [5, 58], [-5, 50], [-10, 43]],
  // Africa
  [[-17, 15], [-10, 32], [0, 36], [10, 37], [20, 32], [32, 31], [43, 11], [51, 10], [40, -5], [35, -20], [28, -33], [18, -35], [12, -18], [8, 4], [-5, 5]],
  // Asia
  [[33, 45], [45, 55], [40, 65], [45, 72], [70, 75], [100, 77], [130, 72], [160, 70], [178, 66], [170, 60], [158, 55], [150, 45], [135, 38], [122, 30], [110, 18], [105, 8], [98, 6], [90, 20], [80, 6], [72, 18], [60, 24], [48, 28], [40, 38]],
  // Australia
  [[114, -22], [122, -14], [132, -11], [142, -11], [150, -22], [153, -30], [146, -39], [135, -35], [124, -34], [114, -30]],
];

export function WorldMap({ children }: { children?: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full">
      <defs>
        <filter id="soft-halo" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* graticule — thin lines, quiet grid */}
      {[60, 120, 180, 240, 300].map((x) => (
        <line key={`v${x}`} x1={x * 2} y1={0} x2={x * 2} y2={MAP_H} stroke="#EEEDE8" strokeWidth="0.5" />
      ))}
      {[60, 120, 180, 240, 300].map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={MAP_W} y2={y} stroke="#EEEDE8" strokeWidth="0.5" />
      ))}

      {CONTINENTS.map((poly, i) => (
        <polygon
          key={i}
          points={poly.map((c) => project(c as [number, number]).join(",")).join(" ")}
          fill="#F0EFEA"
          stroke="#E4E3DC"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      ))}

      {children}
    </svg>
  );
}
