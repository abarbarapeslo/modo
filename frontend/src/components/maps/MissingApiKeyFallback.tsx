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
        Crie uma conta gratuita no Mapbox (50.000 carregamentos/mês) e adicione o token
        em <code className="text-ink-soft">modo/.env</code>:
      </p>
      <pre className="mt-4 w-full max-w-md overflow-x-auto rounded-lg border border-line bg-white px-4 py-3 text-left text-[11px] leading-relaxed text-ink-soft">
        VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ...
      </pre>
      <ol className="mt-4 max-w-md space-y-2 text-left text-[11px] leading-relaxed text-ink-mute">
        <li>
          1. Cadastre-se em{" "}
          <a
            href="https://account.mapbox.com/auth/signup/"
            target="_blank"
            rel="noreferrer"
            className="text-info-ink underline hover:text-ink"
          >
            mapbox.com
          </a>{" "}
          (grátis)
        </li>
        <li>
          2. Em{" "}
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noreferrer"
            className="text-info-ink underline hover:text-ink"
          >
            Access Tokens
          </a>
          , copie o <strong className="font-medium text-ink-soft">Default public token</strong>
        </li>
        <li>
          3. Cole em <code className="text-ink-soft">VITE_MAPBOX_ACCESS_TOKEN</code>
        </li>
        <li>4. Reinicie o frontend (<code className="text-ink-soft">npm run dev</code>)</li>
      </ol>
    </div>
  );
}
