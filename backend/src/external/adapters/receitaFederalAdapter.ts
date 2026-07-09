export const receitaFederalAdapter = {
  async lookupCnpj(_cnpj: string) {
    return {
      source: "Receita Federal (mock)",
      status: "placeholder",
      sector: "Electronics manufacturing",
    };
  },
};
