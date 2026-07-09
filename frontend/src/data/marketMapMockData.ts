// ---------------------------------------------------------------------------
// MODO Market Map — mock data for Economic Digital Twin heat layers
// ---------------------------------------------------------------------------

export type MarketMaturity =
  | "Emerging"
  | "Growth"
  | "Mature"
  | "Consolidating"
  | "Declining";

export type MarketHeatPoint = {
  id: string;
  country: string;
  region: string;
  coordinates: [number, number];
  heatScore: number;
  drivers: string[];
  risks: string[];
  opportunities: string[];
  signals: string[];
  futureSources?: string[];
};

export type MarketMetrics = {
  tam: string;
  sam: string;
  som: string;
  cagr: string;
  growthYoY: string;
  maturity: MarketMaturity;
  competitiveIntensity: number;
  demandGrowth: number;
  regulatoryPressure: number;
  macroSensitivity: number;
  supplyChainRisk: number;
  strategicFitScore: number;
  marketAttentionGap: number;
  neglectedVariableScore: number;
  neglectedVariable?: string;
  timingScore: number;
  fragilityScore: number;
  signalVelocity: number;
  marketEffortGap?: number;
  marketRealityPressure?: number;
};

export type MarketSignal = {
  id: string;
  title: string;
  sector: string;
  impactScore: number;
  affectedRegions: string[];
  affectedDepartments: string[];
  summary: string;
  timestamp: string;
};

export type Market = {
  id: string;
  name: string;
  description: string;
  category: string;
  heatPoints: MarketHeatPoint[];
  metrics: MarketMetrics;
  signals: MarketSignal[];
};

export type WatchMode = "BUDGET_CONSCIOUS" | "ALWAYS_ON";

export const SUGGESTED_MARKETS = [
  "Agroindústria",
  "Saúde privada",
  "Educação privada",
  "Saneamento",
  "Infraestrutura e concessões",
  "Data centers e cloud",
  "Bioeconomia e carbono",
  "Minerais críticos",
  "Logística urbana",
  "Crédito e risco corporativo",
  "Alimentos e bebidas",
  "Turismo e eventos",
  "Energia renovável",
  "Semicondutores",
  "Varejo e consumo",
] as const;

const hp = (
  id: string,
  country: string,
  region: string,
  lon: number,
  lat: number,
  heatScore: number,
  drivers: string[],
  risks: string[],
  opportunities: string[],
  signals: string[]
): MarketHeatPoint => ({
  id,
  country,
  region,
  coordinates: [lon, lat],
  heatScore,
  drivers,
  risks,
  opportunities,
  signals,
  futureSources: ["IBGE", "World Bank", "UN Comtrade", "GDELT"],
});

export const markets: Market[] = [
  {
    id: "agroindustria",
    name: "Agroindústria",
    description: "Cadeia global de produção, exportação e transformação agroindustrial.",
    category: "Primary & Export",
    heatPoints: [
      hp("br", "Brasil", "Centro-Oeste & Sul", -51, -12, 92,
        ["expansão da agroindústria", "câmbio favorável à exportação", "demanda chinesa"],
        ["risco climático", "pressão logística", "custo de diesel"],
        ["novos mercados asiáticos", "bioinsumos", "rastreabilidade premium"],
        ["aumento de exportações", "alta no custo de diesel", "alertas climáticos no Centro-Oeste"]),
      hp("us", "EUA", "Midwest", -98, 39, 86,
        ["commodity prices", "biofuels policy", "export demand"],
        ["drought cycles", "trade policy shifts"],
        ["sustainable agriculture tech"],
        ["corn futures volatility", "ethanol mandate review"]),
      hp("ar", "Argentina", "Pampas", -63, -34, 79,
        ["soy export capacity", "FX dynamics"],
        ["political risk", "inflation"],
        ["regional supply gap fill"],
        ["harvest forecast revised upward"]),
      hp("cn", "China", "Import hubs", 116.4, 35, 88,
        ["feed demand", "food security policy", "import diversification"],
        ["trade restrictions", "stockpile policy"],
        ["Brazil partnership deepening"],
        ["grain import quotas adjusted"]),
      hp("eu", "União Europeia", "Western Europe", 10, 50, 72,
        ["sustainability regulation", "organic demand"],
        ["deforestation compliance", "carbon border tax"],
        ["traceability premium markets"],
        ["EUDR enforcement timeline accelerated"]),
      hp("in", "Índia", "North & West", 77, 20, 68,
        ["population growth", "protein demand"],
        ["monsoon variability", "storage infrastructure"],
        ["processing investment"],
        ["palm oil import surge"]),
    ],
    metrics: {
      tam: "US$ 4.8T",
      sam: "US$ 1.2T",
      som: "US$ 180B",
      cagr: "5.8%",
      growthYoY: "+4.2%",
      maturity: "Mature",
      competitiveIntensity: 74,
      demandGrowth: 81,
      regulatoryPressure: 62,
      macroSensitivity: 88,
      supplyChainRisk: 76,
      strategicFitScore: 71,
      marketAttentionGap: 68,
      neglectedVariableScore: 82,
      neglectedVariable: "Water availability",
      timingScore: 64,
      fragilityScore: 58,
      signalVelocity: 72,
      marketEffortGap: 45,
      marketRealityPressure: 79,
    },
    signals: [
      {
        id: "s1",
        title: "Brazilian agribusiness exports accelerate",
        sector: "Agroindústria",
        impactScore: 84,
        affectedRegions: ["Brasil", "China", "EU"],
        affectedDepartments: ["Sales", "Supply Chain", "Finance"],
        summary: "Export volumes up 12% QoQ driven by soy and beef demand.",
        timestamp: "2026-07-08",
      },
      {
        id: "s2",
        title: "Diesel cost pressure on grain logistics",
        sector: "Agroindústria",
        impactScore: 71,
        affectedRegions: ["Brasil", "Argentina"],
        affectedDepartments: ["Operations", "Finance"],
        summary: "Freight margins compressing across key corridors.",
        timestamp: "2026-07-06",
      },
    ],
  },
  {
    id: "data-centers",
    name: "Data centers e cloud",
    description: "Infraestrutura digital, soberania de dados e capacidade de computação global.",
    category: "Technology Infrastructure",
    heatPoints: [
      hp("us-dc", "EUA", "Virginia & Oregon", -78, 38, 94,
        ["AI infrastructure demand", "hyperscaler expansion"],
        ["energy constraints", "water usage scrutiny"],
        ["edge computing growth"],
        ["new 2GW campus announced in Virginia"]),
      hp("br-dc", "Brasil", "São Paulo & Fortaleza", -46, -15, 78,
        ["data sovereignty", "cloud localization", "latency to LATAM"],
        ["energy cost", "tax uncertainty"],
        ["enterprise migration wave"],
        ["ANATEL data residency guidelines updated"]),
      hp("ie", "Irlanda", "Dublin region", -6.2, 53.3, 82,
        ["EU gateway status", "cool climate", "tax incentives"],
        ["power grid limits", "housing pressure"],
        ["AI training clusters"],
        ["grid connection queue extended 18 months"]),
      hp("sg", "Singapura", "APAC hub", 103.8, 1.35, 88,
        ["APAC interconnect", "financial services cloud"],
        ["land scarcity", "cooling costs"],
        ["subsea cable expansion"],
        ["new green data center zone approved"]),
      hp("in-dc", "Índia", "Mumbai & Chennai", 72.8, 19, 81,
        ["digital India push", "mobile-first economy"],
        ["power reliability", "land acquisition"],
        ["sovereign cloud demand"],
        ["Jio cloud capacity doubled"]),
      hp("ae", "Emirados Árabes", "Dubai & Abu Dhabi", 54.5, 24.5, 76,
        ["AI hub ambition", "energy availability"],
        ["geopolitical exposure", "talent concentration"],
        ["MENA gateway positioning"],
        ["G42-Stargate partnership announced"]),
      hp("nordic", "Países nórdicos", "Nordic region", 15, 62, 73,
        ["renewable energy", "natural cooling"],
        ["distance to demand centers"],
        ["sustainable compute branding"],
        ["Iceland expansion by major hyperscaler"]),
    ],
    metrics: {
      tam: "US$ 320B",
      sam: "US$ 95B",
      som: "US$ 14B",
      cagr: "12.4%",
      growthYoY: "+18.7%",
      maturity: "Growth",
      competitiveIntensity: 82,
      demandGrowth: 91,
      regulatoryPressure: 58,
      macroSensitivity: 45,
      supplyChainRisk: 69,
      strategicFitScore: 78,
      marketAttentionGap: 54,
      neglectedVariableScore: 61,
      neglectedVariable: "Cooling water stress",
      timingScore: 86,
      fragilityScore: 42,
      signalVelocity: 88,
      marketEffortGap: 38,
      marketRealityPressure: 85,
    },
    signals: [
      {
        id: "s3",
        title: "AI workload surge drives DC capacity shortage",
        sector: "Data centers e cloud",
        impactScore: 92,
        affectedRegions: ["EUA", "Irlanda", "Singapura"],
        affectedDepartments: ["Engineering", "Finance", "Strategy"],
        summary: "Lead times for GPU-ready facilities extend to 24+ months.",
        timestamp: "2026-07-09",
      },
    ],
  },
  {
    id: "minerais-criticos",
    name: "Minerais críticos",
    description: "Terras raras, lítio, níquel, cobre e cadeia de baterias.",
    category: "Materials & Energy Transition",
    heatPoints: [
      hp("cn-min", "China", "Processing hubs", 116.4, 35, 95,
        ["rare earth processing dominance", "export controls"],
        ["geopolitical leverage", "environmental regulation"],
        ["downstream battery integration"],
        ["rare earth export restrictions increased"]),
      hp("br-min", "Brasil", "Minas Gerais & Pará", -44, -5, 81,
        ["lithium discoveries", "niobium reserves", "ESG positioning"],
        ["licensing delays", "infrastructure gaps"],
        ["EU partnership potential"],
        ["new lithium auction round announced"]),
      hp("au", "Austrália", "Western Australia", 121, -25, 89,
        ["lithium export leader", "mining expertise"],
        ["China demand dependency", "labor costs"],
        ["processing onshore push"],
        ["spodumene prices rebound"]),
      hp("cl", "Chile", "Atacama", -71, -23, 84,
        ["lithium brine reserves", "established operators"],
        ["water rights conflict", "royalty policy"],
        ["DLE technology adoption"],
        ["royalty reform passed"]),
      hp("cd", "Congo", "Katanga", 23, -4, 91,
        ["cobalt reserves", "battery supply chain"],
        ["political instability", "artisanal mining ESG"],
        ["Western diversification efforts"],
        ["Chinese investment expanded in cobalt belt"]),
      hp("ca", "Canadá", "Quebec & Ontario", -106, 56, 74,
        ["critical minerals strategy", "USMCA alignment"],
        ["permitting timelines", "remote logistics"],
        ["battery plant co-location"],
        ["federal critical minerals fund allocated"]),
      hp("id", "Indonésia", "Sulawesi & Maluku", 113, -2, 82,
        ["nickel processing", "export ban policy"],
        ["environmental scrutiny", "policy volatility"],
        ["integrated smelter expansion"],
        ["nickel export policy revised"]),
    ],
    metrics: {
      tam: "US$ 580B",
      sam: "US$ 140B",
      som: "US$ 22B",
      cagr: "9.1%",
      growthYoY: "+11.3%",
      maturity: "Growth",
      competitiveIntensity: 78,
      demandGrowth: 86,
      regulatoryPressure: 71,
      macroSensitivity: 68,
      supplyChainRisk: 92,
      strategicFitScore: 65,
      marketAttentionGap: 79,
      neglectedVariableScore: 88,
      neglectedVariable: "Rare earth supply risk",
      timingScore: 74,
      fragilityScore: 81,
      signalVelocity: 85,
      marketEffortGap: 62,
      marketRealityPressure: 91,
    },
    signals: [
      {
        id: "s4",
        title: "Rare earth export restrictions increased",
        sector: "Minerais críticos",
        impactScore: 94,
        affectedRegions: ["China", "Australia", "Brazil"],
        affectedDepartments: ["Procurement", "Product", "Finance"],
        summary: "New export licensing requirements for heavy rare earths.",
        timestamp: "2026-07-07",
      },
    ],
  },
  {
    id: "saude-privada",
    name: "Saúde privada",
    description: "Hospitais, planos de saúde, diagnósticos e tecnologia médica.",
    category: "Healthcare",
    heatPoints: [
      hp("br-saude", "Brasil", "Sudeste", -46, -22, 85,
        ["aging population", "plan penetration", "digital health"],
        ["regulatory complexity", "reimbursement pressure"],
        ["telemedicine expansion"],
        ["ANS premium adjustment announced"]),
      hp("us-saude", "EUA", "National", -98, 39, 90,
        ["innovation hub", "payer consolidation"],
        ["cost inflation", "policy uncertainty"],
        ["AI diagnostics adoption"],
        ["Medicare reimbursement update"]),
      hp("eu-saude", "União Europeia", "Western Europe", 10, 50, 76,
        ["universal coverage models", "aging demographics"],
        ["bureaucracy", "cross-border licensing"],
        ["health tourism"],
        ["EU Health Data Space regulation"]),
      hp("in-saude", "Índia", "Urban centers", 77, 20, 82,
        ["medical tourism", "generic pharma"],
        ["infrastructure gaps", "insurance penetration"],
        ["hospital chain expansion"],
        ["Ayushman Bharat expansion"]),
    ],
    metrics: {
      tam: "US$ 2.1T",
      sam: "US$ 480B",
      som: "US$ 52B",
      cagr: "7.2%",
      growthYoY: "+6.8%",
      maturity: "Growth",
      competitiveIntensity: 71,
      demandGrowth: 78,
      regulatoryPressure: 84,
      macroSensitivity: 52,
      supplyChainRisk: 48,
      strategicFitScore: 58,
      marketAttentionGap: 42,
      neglectedVariableScore: 55,
      neglectedVariable: "Aging workforce in care delivery",
      timingScore: 61,
      fragilityScore: 47,
      signalVelocity: 58,
      marketEffortGap: 33,
      marketRealityPressure: 62,
    },
    signals: [
      {
        id: "s5",
        title: "Private health plan enrollment accelerates in Brazil",
        sector: "Saúde privada",
        impactScore: 72,
        affectedRegions: ["Brasil"],
        affectedDepartments: ["Strategy", "HR", "Finance"],
        summary: "Corporate plan uptake rises 8% driven by hybrid work benefits.",
        timestamp: "2026-07-05",
      },
    ],
  },
  {
    id: "infraestrutura",
    name: "Infraestrutura e concessões",
    description: "Rodovias, portos, aeroportos, energia e PPPs.",
    category: "Infrastructure",
    heatPoints: [
      hp("br-infra", "Brasil", "National", -51, -12, 88,
        ["concession pipeline", "PAC investment", "logistics demand"],
        ["political cycles", "bureaucracy"],
        ["port privatization wave"],
        ["new highway concession auction"]),
      hp("in-infra", "Índia", "National", 77, 20, 86,
        ["national infrastructure pipeline", "urbanization"],
        ["land acquisition", "financing gaps"],
        ["metro expansion"],
        ["Gati Shakti project milestone"]),
      hp("cn-infra", "China", "Eastern coast", 116, 35, 80,
        ["BRI investments", "high-speed rail"],
        ["debt concerns", "overcapacity risk"],
        ["green infrastructure pivot"],
        ["local government bond issuance surge"]),
      hp("eu-infra", "União Europeia", "Trans-European", 10, 50, 74,
        ["green deal funding", "cross-border connectivity"],
        ["permitting delays", "fiscal constraints"],
        ["hydrogen corridor projects"],
        ["EU infrastructure bank allocation"]),
    ],
    metrics: {
      tam: "US$ 3.4T",
      sam: "US$ 620B",
      som: "US$ 48B",
      cagr: "6.1%",
      growthYoY: "+5.4%",
      maturity: "Mature",
      competitiveIntensity: 68,
      demandGrowth: 72,
      regulatoryPressure: 76,
      macroSensitivity: 81,
      supplyChainRisk: 64,
      strategicFitScore: 69,
      marketAttentionGap: 51,
      neglectedVariableScore: 48,
      neglectedVariable: "PPP contract renegotiation risk",
      timingScore: 67,
      fragilityScore: 55,
      signalVelocity: 54,
      marketEffortGap: 41,
      marketRealityPressure: 70,
    },
    signals: [
      {
        id: "s6",
        title: "Brazil highway concession awards exceed targets",
        sector: "Infraestrutura e concessões",
        impactScore: 78,
        affectedRegions: ["Brasil"],
        affectedDepartments: ["Finance", "Operations", "Legal"],
        summary: "R$ 42B in new concessions signal infrastructure momentum.",
        timestamp: "2026-07-04",
      },
    ],
  },
  {
    id: "bioeconomia",
    name: "Bioeconomia e carbono",
    description: "Créditos de carbono, biocombustíveis, florestas e economia circular.",
    category: "Sustainability",
    heatPoints: [
      hp("br-bio", "Brasil", "Amazônia & Cerrado", -55, -10, 90,
        ["carbon credit potential", "biodiversity assets", "biofuels"],
        ["deforestation scrutiny", "policy reversals"],
        ["nature-based solutions market"],
        ["new REDD+ project registrations"]),
      hp("eu-bio", "União Europeia", "Western Europe", 10, 50, 82,
        ["CBAM implementation", "green taxonomy"],
        ["compliance costs", "fragmented standards"],
        ["carbon market integration"],
        ["EU ETS price reaches new high"]),
      hp("us-bio", "EUA", "California & Northeast", -120, 38, 78,
        ["IRA incentives", "state-level carbon markets"],
        ["political reversal risk", "verification standards"],
        ["carbon capture subsidies"],
        ["California carbon allowance auction"]),
      hp("au-bio", "Austrália", "National", 133, -25, 71,
        ["land-based carbon projects", "mining transition"],
        ["bushfire risk", "methodology disputes"],
        ["indigenous partnership models"],
        ["carbon farming scheme expanded"]),
    ],
    metrics: {
      tam: "US$ 890B",
      sam: "US$ 210B",
      som: "US$ 28B",
      cagr: "14.2%",
      growthYoY: "+16.8%",
      maturity: "Emerging",
      competitiveIntensity: 62,
      demandGrowth: 84,
      regulatoryPressure: 79,
      macroSensitivity: 58,
      supplyChainRisk: 52,
      strategicFitScore: 74,
      marketAttentionGap: 63,
      neglectedVariableScore: 71,
      neglectedVariable: "Carbon verification integrity",
      timingScore: 82,
      fragilityScore: 49,
      signalVelocity: 76,
      marketEffortGap: 52,
      marketRealityPressure: 68,
    },
    signals: [
      {
        id: "s7",
        title: "Voluntary carbon market integrity standards tighten",
        sector: "Bioeconomia e carbono",
        impactScore: 80,
        affectedRegions: ["Brasil", "EU", "EUA"],
        affectedDepartments: ["Strategy", "Legal", "Finance"],
        summary: "New verification requirements raise bar for project developers.",
        timestamp: "2026-07-03",
      },
    ],
  },
];

/** Resolve market by display name (suggested list) or id */
export function getMarketByNameOrId(query: string): Market | undefined {
  const q = query.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return markets.find((m) => {
    const name = m.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return m.id === query || name === q || name.includes(q);
  });
}

export function getMarketById(id: string): Market | undefined {
  return markets.find((m) => m.id === id);
}

export function heatColor(score: number): string {
  if (score >= 90) return "#D4915A";
  if (score >= 75) return "#E8B83A";
  if (score >= 55) return "#EFD37A";
  if (score >= 35) return "#B8CDE0";
  return "#8FAFC4";
}

export const ASK_MODO_RESPONSES: Record<string, string> = {
  default:
    "Este mercado apresenta alta pressão externa, mas baixa atenção interna. Os principais drivers são crescimento de demanda, risco regulatório e mudanças na cadeia de suprimentos. Recomendo monitorar as regiões de maior heat score nas próximas duas semanas.",
};

export function getAskModoResponse(market: Market): string {
  return `O mercado de ${market.name} apresenta pressão externa significativa (Reality Pressure: ${market.metrics.marketRealityPressure ?? "—"}/100) com Market Attention Gap de ${market.metrics.marketAttentionGap}. Os principais drivers são ${market.heatPoints[0]?.drivers.slice(0, 3).join(", ")}. Variável negligenciada: ${market.metrics.neglectedVariable ?? "em análise"}. Recomendo monitorar ${market.heatPoints.slice(0, 3).map((p) => p.country).join(", ")} nas próximas duas semanas e cruzar com seus OKRs atuais.`;
}

export const WATCH_SCHEDULE_EXAMPLE = [
  { day: "Segunda", focus: "Mercado financeiro e câmbio" },
  { day: "Terça", focus: "Semicondutores e terras raras" },
  { day: "Quarta", focus: "Logística e comércio exterior" },
  { day: "Quinta", focus: "Comportamento do consumidor" },
  { day: "Sexta", focus: "Energia e regulação" },
];
