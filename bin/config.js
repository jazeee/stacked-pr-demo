#!/usr/bin/env node
import { readConfig, writeConfig } from '../src/config-file.js';

const [key, ...rest] = process.argv.slice(2);
const config = readConfig();

function parseValue(raw) {
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return raw;
}

if (key === undefined) {
  for (const [name, value] of Object.entries(config)) console.log(`${name}=${value}`);
} else if (!(key in config)) {
  console.error(`Unknown setting: ${key}`);
  process.exit(1);
} else if (rest.length === 0) {
  console.log(config[key]);
} else {
  config[key] = parseValue(rest.join(' '));
  writeConfig(config);
  console.log(`${key}=${config[key]}`);
}
