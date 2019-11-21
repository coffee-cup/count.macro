import { lines, linesIn, words, wordsIn } from "../lib/index.macro";

console.log(`This file has ${lines} lines`);
console.log(`lines.txt has ${linesIn("./lines.txt")}`);

console.log(`This file has ${words} words`);
console.log(`words.txt has ${wordsIn("./words.txt")}`);
