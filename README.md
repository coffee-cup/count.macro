# count.macro

![](https://github.com/coffee-cup/count.macro/workflows/CI/badge.svg)
![](https://img.shields.io/npm/v/count.macro?style=flat-square)
![](https://img.shields.io/github/license/coffee-cup/count.macro?style=flat-square&color=brightgreen)
[![Babel
Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

Count lines or words in files at build time

## Usage

`count.macro` is a [Babel
macro](https://github.com/kentcdodds/babel-plugin-macros). This will work out of
the box with CRA, Gatsby, and Next.

Line and word information is based on the **source** file, not the output file.

This file

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
