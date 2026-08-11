#!/usr/bin/env node
import { DEFAULTS } from '../src/config.js';
import { configExists, configPath, initConfig, readConfig, writeConfig } from '../src/config-file.js';

const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const [command, ...args] = argv.filter((arg) => arg !== '--json');
if (command === 'init') {
  try {
    const path = initConfig();
    console.log(asJson ? JSON.stringify({ path, created: true }) : `Created ${path}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

if (command === 'path') {
  const path = configPath();
  console.log(asJson ? JSON.stringify({ path, exists: configExists() }) : path);
  process.exit(0);
}

const isUnset = command === 'unset';
const [key, ...rest] = isUnset ? args : [command, ...args];
const config = readConfig();

function parseValue(raw) {
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return raw;
}

if (key === undefined) {
  if (asJson) console.log(JSON.stringify(config, null, 2));
  else for (const [name, value] of Object.entries(config)) console.log(`${name}=${value}`);
} else if (!(key in config)) {
  console.error(`Unknown setting: ${key}`);
  process.exit(1);
} else if (isUnset) {
  config[key] = DEFAULTS[key];
  writeConfig(config);
  console.log(`${key}=${config[key]} (default)`);
} else if (rest.length === 0) {
  console.log(asJson ? JSON.stringify(config[key]) : config[key]);
} else {
  config[key] = parseValue(rest.join(' '));
  writeConfig(config);
  console.log(`${key}=${config[key]}`);
}
