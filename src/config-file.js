import { readFileSync, writeFileSync } from 'node:fs';
import { DEFAULTS, validate, withDefaults } from './config.js';

const CONFIG_PATH = new URL(/**test*/ '../.todorc.json', import.meta.url);

function envOverrides(env) {
  const overrides = {};
  for (const key of Object.keys(DEFAULTS)) {
    const raw = env[`TODO_${key.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()}`];
    if (raw === undefined) continue;
    overrides[key] = typeof DEFAULTS[key] === 'boolean' ? raw === 'true' : raw;
  }
  return overrides;
}

export function readConfig(env = process.env) {
  try {
    const fromFile = validate(JSON.parse(readFileSync(CONFIG_PATH, 'utf8')));
    return withDefaults({ ...fromFile, ...envOverrides(env) });
  } catch (error) {
    if (error.code === 'ENOENT') return withDefaults(envOverrides(env));
    throw error;
  }
}

export function writeConfig(config) {
  validate(config);
  writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
}
