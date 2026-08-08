import { readFileSync, writeFileSync } from 'node:fs';
import { withDefaults } from './config.js';

const CONFIG_PATH = new URL('../.todorc.json', import.meta.url);

export function readConfig() {
  try {
    return withDefaults(JSON.parse(readFileSync(CONFIG_PATH, 'utf8')));
  } catch (error) {
    if (error.code === 'ENOENT') return withDefaults({});
    throw error;
  }
}

export function writeConfig(config) {
  writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
}
