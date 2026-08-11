#!/usr/bin/env node
import { DEFAULTS } from '../src/config.js';
import { readConfig, writeConfig } from '../src/config-file.js';

const [command, ...args] = process.argv.slice(2);
const isUnset = command === 'unset';
const [key, ...rest] = isUnset ? args : [command, ...args];
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
} else if (isUnset) {
  config[key] = DEFAULTS[key];
  writeConfig(config);
  console.log(`${key}=${config[key]} (default)`);
} else if (rest.length === 0) {
  console.log(config[key]);
} else {
  config[key] = parseValue(rest.join(' '));
  writeConfig(config);
  console.log(`${key}=${config[key]}`);
}
