import { markerRadius } from "./mapUtils";

export default function MapMarkerPin({
  score,
  color,
  active,
  visible = true,
}: {
  score: number;
  color: string;
  active?: boolean;
  visible?: boolean;
}) {
  const r = markerRadius(score);
  const halo = r * 2.2;

  return (
    <div
      className="relative flex items-center justify-center transition-opacity duration-300"
      style={{ width: halo * 2, height: halo * 2, opacity: visible ? 1 : 0 }}
    >
      <span
        className="absolute rounded-full"
        style={{
          width: halo * 2,
          height: halo * 2,
          backgroundColor: color,
          opacity: 0.18,
        }}
      />
      <span
        className="relative rounded-full border-2 transition-transform"
        style={{
          width: r * 2,
          height: r * 2,
          backgroundColor: color,
          opacity: active ? 0.95 : 0.65,
          borderColor: active ? "#1E1D1A" : "#FFFFFF",
          transform: active ? "scale(1.12)" : "scale(1)",
        }}
      />
    </div>
  );
}
