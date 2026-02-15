export const formatValues = (value) => {
    // console.log("Formatting value:", value, typeof value);
    if (value === null || value === undefined) return "";
    return `${(Number(value)).toFixed(2)}`;
};