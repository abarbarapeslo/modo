export const bcbAdapter = {
  async fetchIndicators() {
    return {
      source: "Banco Central (mock)",
      indicators: [
        { name: "Selic", value: "10.50%", trend: "stable" },
        { name: "USD/BRL", value: "5.42", trend: "volatile" },
        { name: "Credit growth", value: "+2.3% YoY", trend: "slowing" },
      ],
    };
  },
};
