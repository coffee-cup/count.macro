declare module "babel-plugin-macros" {
  import * as Babel from "@babel/core";

  export type References = { [key: string]: Babel.NodePath[] };

  export interface Options {
    configName?: string;
  }

  export interface MacroParams {
    references: { default: Babel.NodePath[] } & References;
    state: any;
    babel: typeof Babel;
  }

  export type MacroHandler = (params: MacroParams) => void;

  export function createMacro(handler: MacroHandler, options?: Options): any;
}
