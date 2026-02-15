export const formatValues = (value) => {
    if (value === null || value === undefined) return "";
    return `${(Number(value)).toFixed(2)}`;
};

export const generateColours = (count) => {
  const colours = [];

  const saturation = 25;
  const lightness = 55; 

  for (let i = 0; i < count; i++) {
    const hue = Math.round((360 / count) * i);
    colours.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colours;
};