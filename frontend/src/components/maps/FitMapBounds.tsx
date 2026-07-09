import { useEffect } from "react";
import { useMap } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import type { LatLngLiteral } from "./mapUtils";

export default function FitMapBounds({
  positions,
  padding = 48,
  maxZoom = 5,
}: {
  positions: LatLngLiteral[];
  padding?: number;
  maxZoom?: number;
}) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map || positions.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    for (const p of positions) bounds.extend([p.lng, p.lat]);

    map.fitBounds(bounds, { padding, maxZoom });
  }, [map, positions, padding, maxZoom]);

  return null;
}
