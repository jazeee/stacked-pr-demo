export function nextId(todos) {
  return todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
}

export function createTodo(todos, title) {
  const trimmed = title?.trim();
  if (!trimmed) throw new Error('A todo needs a title.');
  return { id: nextId(todos), title: trimmed, done: false };
}

export function findTodo(todos, id) {
  const todo = todos.find((candidate) => candidate.id === id);
  if (!todo) throw new Error(`No todo with id ${id}.`);
  return todo;
}
