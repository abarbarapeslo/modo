import { useState, useMemo, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { motion, AnimatePresence } from "framer-motion";
import FitMapBounds from "./FitMapBounds";
import MapMarkerPin from "./MapMarkerPin";
import MissingApiKeyFallback from "./MissingApiKeyFallback";
import { toLatLng, type LonLat } from "./mapUtils";

export type MapPoint = {
  id: string;
  coordinates: LonLat;
  score: number;
  color: string;
  visible?: boolean;
};

type InteractiveWorldMapProps = {
  points: MapPoint[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onHover?: (id: string | null) => void;
  minHeight?: number;
  fitToMarkers?: boolean;
  showExpand?: boolean;
  dimmed?: boolean;
  overlay?: ReactNode;
  footer?: ReactNode;
};

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ?? "";
const MAP_STYLE = "mapbox://styles/mapbox/light-v11";

function MapCanvas({
  points,
  selectedId,
  onSelect,
  onHover,
  minHeight = 340,
  fitToMarkers = true,
  dimmed = false,
  overlay,
  footer,
  expanded = false,
}: InteractiveWorldMapProps & { expanded?: boolean }) {
  const visiblePoints = useMemo(
    () => points.filter((p) => p.visible !== false),
    [points]
  );

  const positions = useMemo(
    () => visiblePoints.map((p) => toLatLng(p.coordinates)),
    [visiblePoints]
  );

  const height = expanded ? 680 : minHeight;

  return (
    <div
      className={`modo-map relative overflow-hidden rounded-xl border border-line bg-white transition-opacity ${
        dimmed ? "opacity-40" : ""
      }`}
      style={{ minHeight: height, height }}
    >
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: 0, latitude: 20, zoom: 1.4 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        projection={{ name: "mercator" }}
        attributionControl
        reuseMaps
      >
        <NavigationControl position="top-left" showCompass={false} />
        {fitToMarkers && visiblePoints.length > 0 && (
          <FitMapBounds positions={positions} maxZoom={expanded ? 8 : 5} />
        )}
        {points.map((p) => {
          const { lat, lng } = toLatLng(p.coordinates);
          return (
            <Marker
              key={p.id}
              longitude={lng}
              latitude={lat}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                onSelect?.(p.id);
              }}
            >
              <div
                onMouseEnter={() => onHover?.(p.id)}
                onMouseLeave={() => onHover?.(null)}
                className="cursor-pointer"
              >
                <MapMarkerPin
                  score={p.score}
                  color={p.color}
                  active={selectedId === p.id}
                  visible={p.visible !== false}
                />
              </div>
            </Marker>
          );
        })}
      </Map>

      {overlay}

      {footer && (
        <div className="relative z-[2] border-t border-line bg-white/90 px-3 py-2 backdrop-blur-sm">
          {footer}
        </div>
      )}
    </div>
  );
}

/** Mapa interativo Mapbox — zoom, arraste e ampliar. Tier gratuito: 50k loads/mês. */
export default function InteractiveWorldMap(props: InteractiveWorldMapProps) {
  const [expanded, setExpanded] = useState(false);
  const closeExpanded = useCallback(() => setExpanded(false), []);

  if (!MAPBOX_TOKEN) {
    return <MissingApiKeyFallback minHeight={props.minHeight} />;
  }

  return (
    <>
      <div className="relative">
        <MapCanvas {...props} />

        {props.showExpand !== false && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="absolute right-3 top-3 z-[2] flex items-center gap-1.5 rounded-lg border border-line bg-white/95 px-3 py-1.5 text-[11px] font-medium text-ink-soft shadow-card backdrop-blur-sm transition-colors hover:border-ink-mute hover:text-ink"
            title="Ampliar mapa"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            Ampliar
          </button>
        )}
      </div>

      {createPortal(
        <AnimatePresence>
          {expanded && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm"
                onClick={closeExpanded}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-4 z-[101] mx-auto flex max-w-6xl flex-col rounded-2xl border border-line bg-paper p-4 shadow-float md:inset-8 md:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="kicker">Mapa ampliado · zoom e arraste para explorar</p>
                  <button
                    type="button"
                    onClick={closeExpanded}
                    className="rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-ink-soft hover:text-ink"
                  >
                    Fechar
                  </button>
                </div>
                <div className="min-h-0 flex-1">
                  <MapCanvas {...props} expanded showExpand={false} fitToMarkers />
                </div>
                {props.footer && (
                  <div className="mt-4 border-t border-line pt-4">{props.footer}</div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
