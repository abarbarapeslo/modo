export const sectorSignalsAdapter = {
  getTriggers() {
    return [
      { sector: "Semiconductors", trigger: "Supply tightness Q3", severity: "high" },
      { sector: "Rare Earths", trigger: "Export controls", severity: "critical" },
      { sector: "Finance", trigger: "Rate volatility", severity: "medium" },
      { sector: "Logistics", trigger: "Asian freight congestion", severity: "medium" },
      { sector: "Energy", trigger: "Manufacturing cost pressure", severity: "low" },
    ];
  },
};
