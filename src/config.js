export const DEFAULTS = {
  store: 'todos.json',
  showCompleted: true,
};

export function withDefaults(config) {
  return { ...DEFAULTS, ...config };
}
