import pluginTester from "babel-plugin-tester";
import * as plugin from "babel-plugin-macros";

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
  },
  tests: {
    "no usage": `import { lines } from "../lib/index.macro"`,
    "2 lines": `
import { lines } from "../lib/index.macro"
const thisManyLines = lines;
`,
    "10 lines": `
import { lines } from "../lib/index.macro"








const thisManyLines = lines;
`,
    linesIn: `
import { linesIn } from "../lib/index.macro"
const x = linesIn("./test.txt");
`,
  },
});
