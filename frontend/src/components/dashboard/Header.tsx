import { useUser, type Role, ROLE_LABELS } from "../../context/UserContext";
import { overviewMetrics } from "../../data/mockData";

const ROLES: Role[] = ["MANAGER", "EXECUTIVE", "LEADERSHIP"];

export default function Header({ onReimagine }: { onReimagine: () => void }) {
  const { user, setRole } = useUser();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-paper/85 px-8 backdrop-blur-md">
      <div className="flex items-center gap-5">
        <div>
          <p className="text-sm font-semibold leading-tight">{user.company}</p>
          <p className="text-[11px] text-ink-mute">Cognitive Digital Twin</p>
        </div>
        <span className="hidden items-center gap-2 rounded-full bg-attention px-3.5 py-1.5 text-xs font-medium md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-attention-strong" />
          Current Mode: {overviewMetrics.currentMode}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onReimagine}
          className="rounded-full bg-ink px-5 py-2 text-xs font-semibold text-paper transition-opacity hover:opacity-85"
        >
          ✦ Reimagine
        </button>

        {/* permission indicator + role switcher (demo) */}
        <label className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-align-ink" title="Permissões ativas" />
          <select
            value={user.role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="cursor-pointer bg-transparent text-xs font-medium text-ink-soft focus:outline-none"
            title="Camada de permissão (demo)"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {ROLE_LABELS[r]}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mist font-serif text-sm">
            {user.name[0]}
          </div>
          <div className="hidden text-right md:block">
            <p className="text-xs font-medium leading-tight">{user.name}</p>
            <p className="text-[10px] text-ink-mute">{user.department}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
