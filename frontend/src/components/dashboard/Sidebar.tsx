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

function NavIcon({ name, className = "" }: { name: IconName; className?: string }) {
  const props = {
    className: `shrink-0 opacity-70 ${className}`,
    width: 16,
    height: 16,
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
        <path d="M8.2 7.8 10.5 15.5M15.8 7.8 13.5 15.5M8.5 6h7" />
      </svg>
    ),
    influence: (
      <svg {...props}>
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="M4.9 4.9l2.1 2.1M16.9 16.9l2.1 2.1M4.9 19.1l2.1-2.1M16.9 7.1l2.1-2.1" />
      </svg>
    ),
    "market-map": (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
    settings: (
      <svg {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  };

  return <>{icons[name]}</>;
}

const items: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: "/dashboard", label: "Overview", icon: "overview", end: true },
  { to: "/dashboard/attention", label: "Attention", icon: "attention" },
  { to: "/dashboard/alignment", label: "Alignment", icon: "alignment" },
  { to: "/dashboard/influence", label: "Influence", icon: "influence" },
  { to: "/dashboard/market-map", label: "Market Map", icon: "market-map" },
  { to: "/dashboard/drift", label: "Drift", icon: "drift" },
  { to: "/dashboard/reports", label: "Reports", icon: "reports" },
  { to: "/dashboard/settings", label: "Settings", icon: "settings" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-line bg-white px-4 py-6 lg:flex">
      <Link to="/" className="mb-10 flex items-center gap-2 px-3">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-attention-strong" />
        <span className="font-serif text-xl font-medium tracking-tight">MODO</span>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-surface font-medium text-ink"
                  : "text-ink-soft hover:bg-surface/60 hover:text-ink"
              }`
            }
          >
            <NavIcon name={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-line bg-surface p-4">
        <p className="kicker mb-1">Quiet Intelligence</p>
        <p className="text-xs leading-relaxed text-ink-soft">
          Attention · Effort · Reality — três dimensões, um modo.
        </p>
      </div>
    </aside>
  );
}
