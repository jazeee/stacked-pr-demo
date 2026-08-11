import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULTS, validate, withDefaults } from './config.js';

export const CONFIG_PATH = new URL('../.todorc.json', import.meta.url);

export function configPath() {
  return fileURLToPath(CONFIG_PATH);
}

export function configExists() {
  return existsSync(CONFIG_PATH);
}

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

export function initConfig() {
  if (configExists()) throw new Error(`Config already exists at ${configPath()}.`);
  writeConfig({ ...DEFAULTS });
  return configPath();
}

export function writeConfig(config) {
  validate(config);
  writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
}
