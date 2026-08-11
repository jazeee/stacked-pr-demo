import { normalizeTag } from './tags.js';

export function buildIndex(items) {
  const index = new Map();
  for (const item of items) {
    for (const tag of item.tags ?? []) {
      const key = normalizeTag(tag);
      if (!index.has(key)) index.set(key, []);
      index.get(key).push(item);
    }
  }
  return index;
}

export function countByTag(items) {
  return [...buildIndex(items)]
    .map(([tag, tagged]) => ({ tag, count: tagged.length }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
