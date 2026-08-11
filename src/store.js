import { readFileSync, writeFileSync } from 'node:fs';

const STORE_PATH = new URL('../todos.json', import.meta.url);

export function readTodos() {
  try {
    return JSON.parse(readFileSync(STORE_PATH, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export function writeTodos(todos) {
  writeFileSync(STORE_PATH, `${JSON.stringify(todos, null, 2)}\n`);
}
