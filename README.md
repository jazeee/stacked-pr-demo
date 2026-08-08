# stacked-pr-demo

A tiny todo CLI, built as a stack of dependent pull requests.

## Stack

| PR | Branch | Base | Adds |
| --- | --- | --- | --- |
| 1 | `feat/storage` | `main` | JSON-backed store |
| 2 | `feat/cli-add-list` | `feat/storage` | `add` / `list` commands |
| 3 | `feat/cli-complete-remove` | `feat/cli-add-list` | `done` / `rm` commands |

## Usage

```sh
node bin/todo.js add "buy milk"
node bin/todo.js list
node bin/todo.js done 1
node bin/todo.js rm 1
```
