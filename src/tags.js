const TAG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export function normalizeTag(raw) {
  const tag = String(raw).trim().replace(/^#/, '').toLowerCase();
  if (!TAG_PATTERN.test(tag)) throw new Error(`Invalid tag: ${raw}`);
  return tag;
}

export function parseTags(input) {
  const tags = String(input)
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(normalizeTag);
  return [...new Set(tags)].sort();
}
