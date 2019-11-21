# count.macro

[![](https://github.com/coffee-cup/count.macro/workflows/CI/badge.svg)](https://github.com/coffee-cup/count.macro/actions?query=workflow%3ACI)
[![](https://img.shields.io/npm/v/count.macro?style=flat-square)](https://www.npmjs.com/package/count.macro)
[![](https://img.shields.io/github/license/coffee-cup/count.macro?style=flat-square&color=brightgreen)](https://github.com/coffee-cup/count.macro/blob/master/LICENSE)
[![Babel
Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

Count lines or words in files at build time

## Installation

`count.macro` is a [Babel
macro](https://github.com/kentcdodds/babel-plugin-macros). This will work out of
the box with CRA, Gatsby, and Next.

```shell
npm install --save-dev count.macro
```

## Usage

Line and word information is based on the **source** file, not the output file.

For example, this file

```js
import { lines, linesIn, words, wordsIn } from "../lib/index.macro";

console.log(`This file has ${lines} lines`);
console.log(`lines.txt has ${linesIn("./lines.txt")}`);

console.log(`This file has ${words} words`);
console.log(`words.txt has ${wordsIn("./words.txt")}`);
```

will be transpiled to

```js
console.log(`This file has ${7} lines`);
console.log(`lines.txt has ${100}`);
console.log(`This file has ${25} words`);
console.log(`words.txt has ${1000}`);
```

### Named Exports

- `lines` is a number that will be transpiled to number of lines in current file
- `linesIn` is a function that takes a filename as an argument. The call will be replaced with the number of lines in the file (relative to the current file).
- `words` is a number that will be transpiled to number of words in current file.
- `wordsIn` is a function that takes a filename as an argument. The call will be replaced with the number of words in the file (relative to the current file).

## CodeSandbox Example

[![Edit count.macro](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/countmacro-jgo3c?fontsize=14&hidenavigation=1&theme=dark)
