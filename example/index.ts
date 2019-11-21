import { lines, linesIn } from "../lib/index.macro";

console.log(`This file has ${lines} lines`);
console.log(`test.txt has ${linesIn("./test.txt")}`);
