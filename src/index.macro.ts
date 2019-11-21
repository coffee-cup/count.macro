import { createMacro, MacroHandler } from "babel-plugin-macros";
import { NodePath } from "@babel/core";
import * as path from "path";
import * as fs from "fs";

const countLines = (text: string): number => text.split("\n").length;

const countWords = (text: string): number =>
  text.length > 0 ? text.trim().split(/\s+/).length : 0;

const macro: MacroHandler = ({ references, state, babel }) => {
  const t = babel.types;

  const applyCurrentFile = (fn: (filename: string) => number) => (
    nodePath: NodePath,
  ) => {
    if (t.isIdentifier(nodePath.node)) {
      nodePath.replaceWith(t.numericLiteral(fn("/")));
    }
  };

  const applyInAnotherFile = (currentFilename: string) => (
    fn: (filename: string) => number,
  ) => (nodePath: NodePath) => {
    const parent = nodePath.parent;
    if (t.isCallExpression(parent)) {
      if (parent.arguments.length !== 1) {
        throw new Error("Can only call linesIn with a single string argument");
      }

      const filenameNode = parent.arguments[0];
      if (!t.isStringLiteral(filenameNode)) {
        throw new Error("Argument to linesIn must be a string literal");
      }

      const absolutePath = path.resolve(
        path.dirname(currentFilename),
        filenameNode.value,
      );

      nodePath.parentPath.replaceWith(t.numericLiteral(fn(absolutePath)));
    }
  };

  const contentsCache: { [filename: string]: string } = {
    "/": state.file.code,
  };

  const readFile = (filename: string): string => {
    let contents = contentsCache[filename];
    if (contents == null) {
      contents = fs.readFileSync(filename, "utf-8");
      contentsCache[filename] = contents;
    }

    return contents;
  };

  const getLinesInFile = (filename: string): number =>
    countLines(readFile(filename));

  const getWordsInFile = (filename: string): number =>
    countWords(readFile(filename));

  const currentFilename = state.file.opts.filename;

  // lines in current file
  (references.lines || []).map(applyCurrentFile(getLinesInFile));

  // lines in another file
  (references.linesIn || []).map(
    applyInAnotherFile(currentFilename)(getLinesInFile),
  );

  // words in current file
  (references.words || []).map(applyCurrentFile(getWordsInFile));

  // words in another file
  (references.wordsIn || []).map(
    applyInAnotherFile(currentFilename)(getWordsInFile),
  );
};

export const lines: number = null as any;
export const linesIn: (filename: string) => number = null as any;
export const words: number = null as any;
export const wordsIn: (filename: string) => number = null as any;

export default createMacro(macro);
