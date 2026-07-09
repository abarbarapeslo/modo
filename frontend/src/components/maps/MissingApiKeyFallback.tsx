export default function MissingApiKeyFallback({ minHeight = 340 }: { minHeight?: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface px-6 py-8 text-center"
      style={{ minHeight }}
    >
      <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-attention text-lg">
        🗺
      </span>
      <p className="text-sm font-medium text-ink">Mapbox não configurado</p>
      <p className="mt-2 max-w-md text-xs leading-relaxed text-ink-mute">
        O token fica apenas no servidor. Adicione no <code className="text-ink-soft">modo/.env</code>:
      </p>
      <pre className="mt-4 w-full max-w-md overflow-x-auto rounded-lg border border-line bg-white px-4 py-3 text-left text-[11px] leading-relaxed text-ink-soft">
        MAPBOX_ACCESS_TOKEN=seu-token-aqui
      </pre>
      <ol className="mt-4 max-w-md space-y-2 text-left text-[11px] leading-relaxed text-ink-mute">
        <li>
          1. Obtenha um token em{" "}
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noreferrer"
            className="text-info-ink underline hover:text-ink"
          >
            mapbox.com/access-tokens
          </a>
        </li>
        <li>
          2. Cole em <code className="text-ink-soft">MAPBOX_ACCESS_TOKEN</code> (sem prefixo{" "}
          <code className="text-ink-soft">VITE_</code>)
        </li>
        <li>3. Reinicie o backend e o frontend</li>
      </ol>
    </div>
  );
}
