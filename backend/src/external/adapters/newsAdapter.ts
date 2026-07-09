export const newsAdapter = {
  async fetchHeadlines() {
    return [
      { title: "Rare earth export controls expand in China", sector: "Rare Earths", impact: 91 },
      { title: "Semiconductor supply tightness expected in Q3", sector: "Semiconductors", impact: 89 },
      { title: "Global interest rate volatility increases", sector: "Finance", impact: 74 },
    ];
  },
};
