import { NavLink, Link } from "react-router-dom";
import type { ReactNode } from "react";

type IconName =
  | "overview"
  | "attention"
  | "alignment"
  | "influence"
  | "market-map"
  | "drift"
  | "reports"
  | "settings";

function NavIcon({ name }: { name: IconName }) {
  const props = {
    className: "shrink-0 opacity-80",
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons: Record<IconName, ReactNode> = {
    overview: (
      <svg {...props}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    attention: (
      <svg {...props}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    alignment: (
      <svg {...props}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M8.2 7.8 10.5 15.5M15.8 7.8 13.5 15.5" />
      </svg>
    ),
    influence: (
      <svg {...props}>
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
    "market-map": (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
      </svg>
    ),
    drift: (
      <svg {...props}>
        <path d="M3 17l5-5 4 3 9-9" />
        <path d="M17 6h4v4" />
      </svg>
    ),
    reports: (
      <svg {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
    ),
    settings: (
      <svg {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4" />
      </svg>
    ),
  };

  return <>{icons[name]}</>;
}

const groups: {
  label: string;
  items: { to: string; label: string; icon: IconName; end?: boolean }[];
}[] = [
  {
    label: "Platform",
    items: [{ to: "/dashboard", label: "Overview", icon: "overview", end: true }],
  },
  {
    label: "Maps",
    items: [
      { to: "/dashboard/attention", label: "Attention", icon: "attention" },
      { to: "/dashboard/alignment", label: "Alignment", icon: "alignment" },
      { to: "/dashboard/influence", label: "Influence", icon: "influence" },
      { to: "/dashboard/market-map", label: "Market Map", icon: "market-map" },
      { to: "/dashboard/drift", label: "Drift", icon: "drift" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { to: "/dashboard/reports", label: "Reports", icon: "reports" },
      { to: "/dashboard/settings", label: "Settings", icon: "settings" },
    ],
  },
];

function NavItem({
  to,
  label,
  icon,
  end,
}: {
  to: string;
  label: string;
  icon: IconName;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group flex items-center gap-3 border-l-2 py-2 pl-4 pr-3 text-[13px] transition-colors ${
          isActive
            ? "border-attention-strong bg-surface font-medium text-ink"
            : "border-transparent text-ink-soft hover:border-line hover:bg-surface/60 hover:text-ink"
        }`
      }
    >
      <NavIcon name={icon} />
      {label}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[220px] shrink-0 flex-col border-r border-line bg-white lg:flex xl:w-[240px]">
      <div className="border-b border-line px-5 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="inline-block h-2 w-2 rounded-full bg-attention-strong" />
          <span className="font-serif text-lg font-medium tracking-tight text-ink">MODO</span>
        </Link>
        <p className="mt-2 text-[10px] uppercase tracking-wider2 text-ink-mute">
          Cognitive Platform
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-5">
        {groups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-4 text-[10px] font-medium uppercase tracking-wider2 text-ink-mute">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-4">
        <div className="rounded-lg border border-line bg-surface px-4 py-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-attention-strong" />
            <p className="text-[10px] font-medium uppercase tracking-wider2 text-ink-mute">
              Twin ativo
            </p>
          </div>
          <p className="text-[11px] leading-relaxed text-ink-soft">
            Attention · Effort · Reality
          </p>
        </div>
      </div>
    </aside>
  );
}
