import pluginTester from "babel-plugin-tester";
import * as plugin from "babel-plugin-macros";

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
  },
  tests: {
    "no usage": `import { lines, linesIn, words, wordsIn } from "../lib/index.macro"`,
    lines: `
import { lines } from "../lib/index.macro"
const x = lines;
`,
    linesIn: `
import { linesIn } from "../lib/index.macro"
const x = linesIn("./lines.txt");
`,
    words: `
import { words } from "../lib/index.macro"
const x = words;
`,
    wordsIn: `
import { wordsIn } from "../lib/index.macro"
const x = wordsIn("./words.txt");
`,
  },
});
