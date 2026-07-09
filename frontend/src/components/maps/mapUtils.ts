export type LonLat = [number, number];

export type LatLngLiteral = { lat: number; lng: number };

export function toLatLng([lon, lat]: LonLat): LatLngLiteral {
  return { lat, lng: lon };
}

export function markerRadius(score: number, min = 8, max = 22): number {
  return min + (score / 100) * (max - min);
}
