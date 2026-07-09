import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  kicker,
  title,
  description,
  action,
  children,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="mb-10 border-b border-line pb-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="kicker mb-3">{kicker}</p>
          <h1 className="font-serif text-4xl font-light leading-tight tracking-tight md:text-[2.75rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children && <div className="mt-8">{children}</div>}
    </motion.header>
  );
}

export function CommandMetricsStrip({
  metrics,
}: {
  metrics: { label: string; value: string; hint?: string; tone?: "default" | "attention" | "align" | "gap" }[];
}) {
  return (
    <div className="grid divide-x divide-line border border-line bg-white md:grid-cols-5">
      {metrics.map((m) => (
        <div key={m.label} className="px-5 py-4 lg:px-6 lg:py-5">
          <p className="text-[10px] font-medium uppercase tracking-wider2 text-ink-mute">
            {m.label}
          </p>
          <p
            className={`metric-serif mt-1 text-2xl lg:text-3xl ${
              m.tone === "attention"
                ? "text-ink"
                : m.tone === "gap"
                  ? "text-gap-ink"
                  : m.tone === "align"
                    ? "text-align-ink"
                    : "text-ink"
            }`}
          >
            {m.value}
          </p>
          {m.hint && (
            <p className="mt-1 text-[11px] leading-snug text-ink-mute">{m.hint}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function ModuleTile({
  to,
  label,
  description,
  tag,
}: {
  to: string;
  label: string;
  description: string;
  tag?: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-xl border border-line bg-white p-5 transition-all hover:border-ink-mute/50 hover:shadow-float"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-mist transition-colors group-hover:bg-attention-strong" />
        {tag && (
          <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-mute">
            {tag}
          </span>
        )}
      </div>
      <h3 className="font-serif text-lg font-medium tracking-tight">{label}</h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-soft">{description}</p>
      <span className="mt-4 text-[11px] font-medium text-ink-mute transition-colors group-hover:text-attention-strong">
        Abrir módulo →
      </span>
    </Link>
  );
}

export function PlatformSection({
  kicker,
  title,
  description,
  children,
  className = "",
}: {
  kicker?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`space-y-6 ${className}`}>
      {(kicker || title) && (
        <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            {kicker && <p className="kicker mb-1">{kicker}</p>}
            {title && (
              <h2 className="font-serif text-2xl font-light tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="mt-1 max-w-xl text-sm text-ink-soft">{description}</p>
            )}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
