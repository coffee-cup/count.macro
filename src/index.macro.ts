import { createMacro, MacroHandler } from "babel-plugin-macros";

const macro: MacroHandler = ({ references, state, babel }) => {
  const t = babel.types;

  const lineReferences = references.lines;

  const numLines: number = state.file.code.split("\n").length;

  lineReferences.map(path => {
    if (t.isIdentifier(path.node)) {
      path.replaceWith(t.numericLiteral(numLines));
    }
  });
};

export const lines: number = null as any;

export default createMacro(macro);
