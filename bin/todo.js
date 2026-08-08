#!/usr/bin/env node
import { readTodos, writeTodos } from '../src/store.js';
import { createTodo } from '../src/todo.js';

const USAGE = `Usage:
  todo add <title>
  todo list`;

function add(args) {
  const todos = readTodos();
  const todo = createTodo(todos, args.join(' '));
  todos.push(todo);
  writeTodos(todos);
  console.log(`Added #${todo.id}: ${todo.title}`);
}

const commands = { add };

const [command, ...args] = process.argv.slice(2);
const handler = commands[command];

if (!handler) {
  console.error(USAGE);
  process.exit(1);
}

try {
  handler(args);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
