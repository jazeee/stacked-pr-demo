export const DEFAULTS = {
  store: 'todos.json',
  showCompleted: true,
};

export function withDefaults(config) {
  return { ...DEFAULTS, ...config };
}

export function validate(config) {
  for (const [key, value] of Object.entries(config)) {
    if (!(key in DEFAULTS)) throw new Error(`Unknown setting: ${key}`);
    if (typeof value !== typeof DEFAULTS[key]) {
      throw new Error(`Setting ${key} must be a ${typeof DEFAULTS[key]}.`);
    }
  }
  return config;
}
