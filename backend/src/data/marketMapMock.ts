// Backend mirror of frontend market map mock — ready for DB seeding

export const marketMapData = [
  {
    id: "agroindustria",
    name: "Agroindústria",
    description: "Cadeia global de produção, exportação e transformação agroindustrial.",
    category: "Primary & Export",
    heatPoints: [
      { id: "br", country: "Brasil", region: "Centro-Oeste & Sul", coordinates: [-51, -12], heatScore: 92,
        drivers: ["expansão da agroindústria", "câmbio favorável", "demanda chinesa"],
        risks: ["risco climático", "diesel"], opportunities: ["novos mercados asiáticos"], signals: ["exportações em alta"] },
      { id: "us", country: "EUA", region: "Midwest", coordinates: [-98, 39], heatScore: 86,
        drivers: ["commodity prices"], risks: ["drought"], opportunities: ["sustainable ag tech"], signals: ["corn futures volatility"] },
      { id: "cn", country: "China", region: "Import hubs", coordinates: [116.4, 35], heatScore: 88,
        drivers: ["food security"], risks: ["trade restrictions"], opportunities: ["Brazil partnership"], signals: ["import quotas adjusted"] },
    ],
    metrics: {
      tam: "US$ 4.8T", sam: "US$ 1.2T", som: "US$ 180B", cagr: "5.8%", growthYoY: "+4.2%",
      maturity: "Mature", competitiveIntensity: 74, demandGrowth: 81, regulatoryPressure: 62,
      macroSensitivity: 88, supplyChainRisk: 76, strategicFitScore: 71, marketAttentionGap: 68,
      neglectedVariableScore: 82, neglectedVariable: "Water availability", timingScore: 64,
      fragilityScore: 58, signalVelocity: 72, marketEffortGap: 45, marketRealityPressure: 79,
    },
    signals: [
      { id: "s1", title: "Brazilian agribusiness exports accelerate", sector: "Agroindústria", impactScore: 84,
        affectedRegions: ["Brasil", "China", "EU"], affectedDepartments: ["Sales", "Supply Chain", "Finance"],
        summary: "Export volumes up 12% QoQ.", timestamp: "2026-07-08" },
    ],
  },
  {
    id: "data-centers",
    name: "Data centers e cloud",
    description: "Infraestrutura digital e soberania de dados.",
    category: "Technology Infrastructure",
    heatPoints: [
      { id: "us-dc", country: "EUA", region: "Virginia", coordinates: [-78, 38], heatScore: 94,
        drivers: ["AI infrastructure"], risks: ["energy constraints"], opportunities: ["edge computing"], signals: ["2GW campus announced"] },
      { id: "br-dc", country: "Brasil", region: "São Paulo", coordinates: [-46, -15], heatScore: 78,
        drivers: ["data sovereignty"], risks: ["energy cost"], opportunities: ["enterprise migration"], signals: ["residency guidelines updated"] },
    ],
    metrics: {
      tam: "US$ 320B", sam: "US$ 95B", som: "US$ 14B", cagr: "12.4%", growthYoY: "+18.7%",
      maturity: "Growth", competitiveIntensity: 82, demandGrowth: 91, regulatoryPressure: 58,
      macroSensitivity: 45, supplyChainRisk: 69, strategicFitScore: 78, marketAttentionGap: 54,
      neglectedVariableScore: 61, neglectedVariable: "Cooling water stress", timingScore: 86,
      fragilityScore: 42, signalVelocity: 88, marketEffortGap: 38, marketRealityPressure: 85,
    },
    signals: [
      { id: "s3", title: "AI workload surge drives DC capacity shortage", sector: "Data centers e cloud", impactScore: 92,
        affectedRegions: ["EUA", "Irlanda"], affectedDepartments: ["Engineering", "Finance"],
        summary: "GPU-ready facility lead times extend to 24+ months.", timestamp: "2026-07-09" },
    ],
  },
  {
    id: "minerais-criticos",
    name: "Minerais críticos",
    description: "Terras raras, lítio, níquel e cadeia de baterias.",
    category: "Materials",
    heatPoints: [
      { id: "cn-min", country: "China", region: "Processing", coordinates: [116.4, 35], heatScore: 95,
        drivers: ["export controls"], risks: ["geopolitical leverage"], opportunities: ["battery integration"], signals: ["export restrictions increased"] },
      { id: "br-min", country: "Brasil", region: "Minas Gerais", coordinates: [-44, -5], heatScore: 81,
        drivers: ["lithium discoveries"], risks: ["licensing delays"], opportunities: ["EU partnership"], signals: ["lithium auction announced"] },
    ],
    metrics: {
      tam: "US$ 580B", sam: "US$ 140B", som: "US$ 22B", cagr: "9.1%", growthYoY: "+11.3%",
      maturity: "Growth", competitiveIntensity: 78, demandGrowth: 86, regulatoryPressure: 71,
      macroSensitivity: 68, supplyChainRisk: 92, strategicFitScore: 65, marketAttentionGap: 79,
      neglectedVariableScore: 88, neglectedVariable: "Rare earth supply risk", timingScore: 74,
      fragilityScore: 81, signalVelocity: 85, marketEffortGap: 62, marketRealityPressure: 91,
    },
    signals: [
      { id: "s4", title: "Rare earth export restrictions increased", sector: "Minerais críticos", impactScore: 94,
        affectedRegions: ["China", "Australia", "Brazil"], affectedDepartments: ["Procurement", "Product"],
        summary: "New export licensing for heavy rare earths.", timestamp: "2026-07-07" },
    ],
  },
  {
    id: "saude-privada",
    name: "Saúde privada",
    description: "Hospitais, planos e tecnologia médica.",
    category: "Healthcare",
    heatPoints: [
      { id: "br-saude", country: "Brasil", region: "Sudeste", coordinates: [-46, -22], heatScore: 85,
        drivers: ["aging population"], risks: ["regulatory complexity"], opportunities: ["telemedicine"], signals: ["premium adjustment"] },
    ],
    metrics: {
      tam: "US$ 2.1T", sam: "US$ 480B", som: "US$ 52B", cagr: "7.2%", growthYoY: "+6.8%",
      maturity: "Growth", competitiveIntensity: 71, demandGrowth: 78, regulatoryPressure: 84,
      macroSensitivity: 52, supplyChainRisk: 48, strategicFitScore: 58, marketAttentionGap: 42,
      neglectedVariableScore: 55, timingScore: 61, fragilityScore: 47, signalVelocity: 58,
    },
    signals: [],
  },
  {
    id: "infraestrutura",
    name: "Infraestrutura e concessões",
    description: "Rodovias, portos, aeroportos e PPPs.",
    category: "Infrastructure",
    heatPoints: [
      { id: "br-infra", country: "Brasil", region: "National", coordinates: [-51, -12], heatScore: 88,
        drivers: ["concession pipeline"], risks: ["political cycles"], opportunities: ["port privatization"], signals: ["highway auction"] },
    ],
    metrics: {
      tam: "US$ 3.4T", sam: "US$ 620B", som: "US$ 48B", cagr: "6.1%", growthYoY: "+5.4%",
      maturity: "Mature", competitiveIntensity: 68, demandGrowth: 72, regulatoryPressure: 76,
      macroSensitivity: 81, supplyChainRisk: 64, strategicFitScore: 69, marketAttentionGap: 51,
      neglectedVariableScore: 48, timingScore: 67, fragilityScore: 55, signalVelocity: 54,
    },
    signals: [],
  },
  {
    id: "bioeconomia",
    name: "Bioeconomia e carbono",
    description: "Créditos de carbono e economia circular.",
    category: "Sustainability",
    heatPoints: [
      { id: "br-bio", country: "Brasil", region: "Amazônia", coordinates: [-55, -10], heatScore: 90,
        drivers: ["carbon credits"], risks: ["deforestation scrutiny"], opportunities: ["nature-based solutions"], signals: ["REDD+ registrations"] },
    ],
    metrics: {
      tam: "US$ 890B", sam: "US$ 210B", som: "US$ 28B", cagr: "14.2%", growthYoY: "+16.8%",
      maturity: "Emerging", competitiveIntensity: 62, demandGrowth: 84, regulatoryPressure: 79,
      macroSensitivity: 58, supplyChainRisk: 52, strategicFitScore: 74, marketAttentionGap: 63,
      neglectedVariableScore: 71, timingScore: 82, fragilityScore: 49, signalVelocity: 76,
    },
    signals: [],
  },
];

export function findMarket(id: string) {
  return marketMapData.find((m) => m.id === id);
}
