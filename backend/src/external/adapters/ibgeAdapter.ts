export const ibgeAdapter = {
  async fetchIndicators() {
    return {
      source: "IBGE (mock)",
      indicators: [
        { name: "IPCA", value: "4.2%", trend: "stable" },
        { name: "Industrial production", value: "+1.1% MoM", trend: "up" },
        { name: "Unemployment", value: "7.8%", trend: "down" },
      ],
    };
  },
};
