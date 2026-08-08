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

## Configuration

Settings live in `.todorc.json` and are validated on read and write.

| Setting | Type | Default |
| --- | --- | --- |
| `store` | string | `todos.json` |
| `showCompleted` | boolean | `true` |

```sh
node bin/config.js                    # print all settings
node bin/config.js showCompleted      # print one setting
node bin/config.js showCompleted false  # set one setting
```
