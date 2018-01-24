#!/usr/bin/env node

import f from './src/compare';

const file1 = '/home/alex/before.json';
const file2 = '/home/alex/after.json';

const objCompare = f(file1, file2);
console.log(objCompare);
