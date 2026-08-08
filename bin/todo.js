#!/usr/bin/env node
import { readTodos, writeTodos } from '../src/store.js';
import { createTodo, findTodo } from '../src/todo.js';

const USAGE = `Usage:
  todo add <title>
  todo list
  todo done <id>
  todo rm <id>`;

function formatTodo(todo) {
  return `${todo.done ? '[x]' : '[ ]'} #${todo.id} ${todo.title}`;
}

function add(args) {
  const todos = readTodos();
  const todo = createTodo(todos, args.join(' '));
  todos.push(todo);
  writeTodos(todos);
  console.log(`Added #${todo.id}: ${todo.title}`);
}

function list() {
  const todos = readTodos();
  if (todos.length === 0) {
    console.log('No todos yet.');
    return;
  }
  for (const todo of todos) console.log(formatTodo(todo));
}

function done(args) {
  const todos = readTodos();
  const todo = findTodo(todos, Number(args[0]));
  todo.done = true;
  writeTodos(todos);
  console.log(`Completed #${todo.id}: ${todo.title}`);
}

function rm(args) {
  const todos = readTodos();
  const todo = findTodo(todos, Number(args[0]));
  writeTodos(todos.filter((candidate) => candidate.id !== todo.id));
  console.log(`Removed #${todo.id}: ${todo.title}`);
}

const commands = { add, list, done, rm };

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
