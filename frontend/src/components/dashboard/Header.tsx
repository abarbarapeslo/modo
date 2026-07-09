import { Link, useLocation } from "react-router-dom";
import { useUser, type Role, ROLE_LABELS } from "../../context/UserContext";
import { overviewMetrics } from "../../data/mockData";

const ROLES: Role[] = ["MANAGER", "EXECUTIVE", "LEADERSHIP"];

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/attention": "Attention",
  "/dashboard/alignment": "Alignment",
  "/dashboard/influence": "Influence",
  "/dashboard/market-map": "Market Map",
  "/dashboard/drift": "Drift",
  "/dashboard/reports": "Reports",
  "/dashboard/settings": "Settings",
};

export default function Header({ onReimagine }: { onReimagine: () => void }) {
  const { user, setRole } = useUser();
  const { pathname } = useLocation();
  const pageLabel = ROUTE_LABELS[pathname] ?? "Platform";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between gap-4 px-6 lg:px-10">
        {/* breadcrumb */}
        <div className="flex min-w-0 items-center gap-2 text-[13px]">
          <Link to="/dashboard" className="shrink-0 font-medium text-ink-soft hover:text-ink">
            {user.company}
          </Link>
          <span className="text-ink-mute/50">/</span>
          <span className="truncate text-ink-mute">Cognitive Twin</span>
          <span className="hidden text-ink-mute/50 sm:inline">/</span>
          <span className="hidden truncate font-medium text-ink sm:inline">{pageLabel}</span>
        </div>

        {/* live mode — center on md+ */}
        <div className="hidden items-center gap-2 md:flex">
          <span className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-attention-strong" />
            {overviewMetrics.currentMode}
          </span>
        </div>

        {/* actions */}
        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          <button
            onClick={onReimagine}
            className="rounded-md bg-ink px-4 py-1.5 text-[11px] font-semibold text-paper transition-opacity hover:opacity-85"
          >
            Reimagine
          </button>

          <label className="hidden items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-align-ink" />
            <select
              value={user.role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="max-w-[100px] cursor-pointer bg-transparent text-[11px] font-medium text-ink-soft focus:outline-none lg:max-w-none"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </label>

          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-mist font-serif text-xs lg:h-8 lg:w-8 lg:text-sm">
            {user.name[0]}
          </div>
        </div>
      </div>
    </header>
  );
}
