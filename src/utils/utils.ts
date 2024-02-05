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

const truncateText = (text: string, chars: number) => {
  if (chars > 3) {
    return text.slice(0, chars - 3) + "...";
  }
  return text;
};

const splitStringToLines = (text: string): string[] => {
  // Use a regular expression to split the string by '\n' but not '\\n'
  const lines = text?.split(/(?<!\\)\\n|(?<!\\\\)\n/);
  // Replace any '\\n' with '\n' in the lines
  return lines;
};

type DateTimeFormatOptions = {
  weekday?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "long" | "short";
};

const formatTime = (timestamp: string): { relativeTime: string; exactTime: string } => {
  const now = new Date();
  const diff = now.getTime() - new Date(timestamp).getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const commentDate = new Date(timestamp);

  const options: DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };


  const exactDate = commentDate.toLocaleDateString(undefined, options);

  if (days > 0) {
    return { relativeTime: `${days}d`, exactTime: exactDate };
  } else if (hours > 0) {
    return { relativeTime: `${hours}h`, exactTime: exactDate };
  } else if (minutes > 0) {
    return { relativeTime: `${minutes}m`, exactTime: exactDate };
  } else {
    return { relativeTime: `${seconds >= 0 ? seconds : 0}s`, exactTime: exactDate };
  }
};

export {
  toTitleCase,
  randomBetween,
  getAvarageRGBValue,
  generateRandomColorString,
  truncateText,
  splitStringToLines,
  formatTime
};
