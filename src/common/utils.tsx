// const breakSentence = (str:string):HTMLElement => {
//     return str.split("\n").map();
// }

const toTitleCase = (str: string) =>
str.replace(/\b(\w)/g, k => k.toUpperCase())
//   str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


export { toTitleCase };
