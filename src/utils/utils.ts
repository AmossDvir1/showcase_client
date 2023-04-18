const toTitleCase = (str: string) =>
  str.replace(/\b(\w)/g, (k) => k.toUpperCase());

const randomBetween = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

const parseRGB = (rgbString: string): number[] => {
  const regex =
    /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(\d*\.?\d+)\s*)?\)$/;
  const match = rgbString.match(regex);
  if (match) {
    const [, R, G, B, alpha] = match;
    const alphaValue = alpha ? parseFloat(alpha) : 1;
    const rgbaArray = [parseInt(R), parseInt(G), parseInt(B), alphaValue];
    return rgbaArray;
  }
  return [0, 0, 0, 0];
};

/**
 * Returns the average RGB value of a color string in the format "rgb(R, G, B)".
 * @param {string} color - The color string in the format "rgb(R, G, B)".
 * @returns {number} The average RGB value of the input color, a number between 0 and 255.
 */
const getAvarageRGBValue = (color: string): number => {
  if (color) {
    const values = parseRGB(color);
    if (values) {
      const average = (arr: number[]) =>
        arr.reduce((p, c) => p + c, 0) / arr.length;
      return average(values.slice(0, values.length - 1));
    }
  }
  return -1;
};

/**
 * Generates a random RGB color string with an optional alpha value.
 * @param {number} [alpha=1] - The alpha value to use for the color. Should be a number between 0 and 1.
 * @returns {string} A random RGB color string in the format `rgb(r, g, b, a)`.
 */
const generateRandomColorString = (alpha = 1) => {
  const randomBetween = (min: number, max: number) =>
    min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgb = `rgb(${r},${g},${b}, ${alpha})`; // Collect all to a css color string
  return rgb;
};
export {
  toTitleCase,
  randomBetween,
  getAvarageRGBValue,
  generateRandomColorString,
};
