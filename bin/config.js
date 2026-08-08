#!/usr/bin/env node
import { readConfig } from '../src/config-file.js';

const [key] = process.argv.slice(2);
const config = readConfig();

if (key === undefined) {
  for (const [name, value] of Object.entries(config)) console.log(`${name}=${value}`);
} else if (key in config) {
  console.log(config[key]);
} else {
  console.error(`Unknown setting: ${key}`);
  process.exit(1);
}
