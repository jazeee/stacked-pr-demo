#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { countByTag } from '../src/tag-index.js';
import { parseTags } from '../src/tags.js';

const USAGE = `Usage:
  tags parse <input>     normalize a tag string
  tags count <file.json> count tags across a JSON array of items`;

const [command, ...args] = process.argv.slice(2);

try {
  if (command === 'parse') {
    console.log(parseTags(args.join(' ')).join(' '));
  } else if (command === 'count') {
    const items = JSON.parse(readFileSync(args[0], 'utf8'));
    for (const { tag, count } of countByTag(items)) console.log(`${count}\t${tag}`);
  } else {
    console.error(USAGE);
    process.exit(1);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
