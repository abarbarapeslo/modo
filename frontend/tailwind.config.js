/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Quiet Intelligence palette
        paper: "#FDFCF9", // off-white levemente quente — fundo principal
        surface: "#F6F5F1", // cinza muito claro — superfícies
        mist: "#EEEDE8", // cinza névoa — cards
        line: "#E4E3DC", // bordas finas
        ink: "#1E1D1A", // preto suave / charcoal
        "ink-soft": "#57554E", // texto secundário
        "ink-mute": "#8F8D83", // labels, metadados
        attention: "#F4E9C8", // amarelo pálido — sinal cognitivo
        "attention-strong": "#E8B83A", // amarelo vivo — CTAs e sinais importantes
        "info-soft": "#DCE7F0", // azul muito suave — estados informacionais
        "info-ink": "#5D7F9C",
        "align-soft": "#DFEADD", // verde suave — alinhamento positivo
        "align-ink": "#5C8266",
        "gap-soft": "#F1DBD0", // fundo de gap crítico
        "gap-ink": "#C05B3C", // laranja/vermelho suave — gaps críticos
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(30,29,26,0.04), 0 8px 24px rgba(30,29,26,0.05)",
        float: "0 2px 6px rgba(30,29,26,0.06), 0 24px 64px rgba(30,29,26,0.10)",
      },
      letterSpacing: {
        wider2: "0.14em",
      },
    },
  },
  plugins: [],
};
