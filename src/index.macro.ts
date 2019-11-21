import { createMacro, MacroHandler } from "babel-plugin-macros";
import * as path from "path";
import * as fs from "fs";

const macro: MacroHandler = ({ references, state, babel }) => {
  const t = babel.types;

  const contentsCache: { [filename: string]: string } = {
    "/": state.file.code,
  };

  const getLinesInFile = (filename: string): number => {
    let contents = contentsCache[filename];
    if (contents == null) {
      contents = fs.readFileSync(filename, "utf-8");
      contentsCache[filename] = contents;
    }

    return contents.split("\n").length;
  };

  // number of lines in current file
  (references.lines || []).map(path => {
    if (t.isIdentifier(path.node)) {
      path.replaceWith(t.numericLiteral(getLinesInFile("/")));
    }
  });

  // number of lines in another file
  (references.linesIn || []).map(refPath => {
    const parent = refPath.parent;
    if (t.isCallExpression(parent)) {
      if (parent.arguments.length !== 1) {
        throw new Error("Can only call linesIn with a single string argument");
      }

      const filenameNode = parent.arguments[0];
      if (!t.isStringLiteral(filenameNode)) {
        throw new Error("Argument to linesIn must be a string literal");
      }

      const absolutePath = path.resolve(
        path.dirname(state.file.opts.filename),
        filenameNode.value,
      );

      const lines = getLinesInFile(absolutePath);
      refPath.parentPath.replaceWith(t.numericLiteral(lines));
    }
  });
};

export const lines: number = null as any;
export const linesIn: (filename: string) => number = null as any;

export default createMacro(macro);
