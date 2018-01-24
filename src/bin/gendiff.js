#!/usr/bin/env node

import program from 'commander';
import f from '../getReport';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]  Output format')
  .arguments('<file1> <file2>')
  .action(f);

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
