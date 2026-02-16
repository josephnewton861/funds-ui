// Formats values to 2 decimal places
export const formatValues = (value) => {
    if (value === null || value === undefined) return "";
    return `${(Number(value)).toFixed(2)}`;
};

// Generate distinct colours for a given count for the chart component
export const generateColours = (count) => {
  const colours = [];
  const saturation = 50;
  const lightness = 40;

  const shift = 210;

  for (let i = 0; i < count; i++) {
    let hue = Math.round(((360 / count) * i + shift) % 360);
    if (hue >= 90 && hue <= 150) hue = (hue < 120 ? 89 : 151);
    colours.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colours;
};

// Tooptip object text
export const tooltip = {
  marketCode:
    "Platform or vendor code for this specific fund share class. Useful for trading, integration, and data matching.",
  lastPrice:
    "Latest Net Asset Value (NAV) per unit. Fund prices are calculated once daily, not in real time.",
  ongoingCharge:
    "This is the annual cost of running the fund, excluding transaction costs. Lower OCF can help improve net returns over time.",
  sector:
    "Sector shows the fund’s asset‑mix category.",
  currency:
    "Latest NAV per unit in GBX (pence) or GBP (pounds). Fund prices are end‑of‑day.",
  rating:
    "Analyst Rating 0–5. A forward‑looking assessment after costs.",
  srri:
    "SRRI 1–7. EU risk scale based on 5 years of volatility.",
  ratingLabel: 
    "This label gives an at-a-glance view of the fund’s quality compared with others in the same sector, using measures like returns, volatility (SRRI), and charges. It’s designed to help you compare funds quickly."
};