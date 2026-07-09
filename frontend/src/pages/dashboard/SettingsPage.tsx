import { useUser, ROLE_LABELS } from "../../context/UserContext";

const integrations = [
  "Google Meet / Zoom transcripts",
  "Notion / Confluence documents",
  "Salesforce CRM",
  "SAP / Oracle ERP",
  "Linear / Jira projects",
  "IBGE / BCB external signals",
];

export default function SettingsPage() {
  const { can, user } = useUser();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <p className="kicker mb-3">Settings</p>
        <h1 className="font-serif text-4xl font-light tracking-tight">
          Governança e <span className="italic">controle</span>
        </h1>
      </header>

      <section className="card p-6">
        <p className="kicker mb-4">Organização</p>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-ink-mute">Empresa</dt>
            <dd className="font-medium">{user.company}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-mute">Seu papel</dt>
            <dd className="font-medium">{ROLE_LABELS[user.role]}</dd>
          </div>
        </dl>
      </section>

      {can("view:admin") && (
        <>
          <section className="card p-6">
            <p className="kicker mb-4">Integrações empresariais</p>
            <ul className="space-y-2">
              {integrations.map((i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 text-sm"
                >
                  {i}
                  <span className="rounded-full bg-attention px-2 py-0.5 text-[10px] font-medium">
                    Conectar
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-6">
            <p className="kicker mb-4">Políticas</p>
            <div className="space-y-3 text-sm text-ink-soft">
              <p>Retenção de dados: 24 meses</p>
              <p>Anonimização em reuniões: parcial</p>
              <p>Auditoria de acesso: ativa</p>
              <p>Mapas liberados por cargo: configurado</p>
            </div>
          </section>
        </>
      )}

      {!can("view:admin") && (
        <p className="text-sm text-ink-soft">
          Configurações administrativas disponíveis apenas para Leadership.
        </p>
      )}
    </div>
  );
}
