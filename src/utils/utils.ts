// const breakSentence = (str:string):HTMLElement => {
//     return str.split("\n").map();
// }

const toTitleCase = (str: string) =>
str.replace(/\b(\w)/g, k => k.toUpperCase())


export { toTitleCase };
