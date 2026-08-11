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

Settings live in `.todorc.json` and are validated on read and write. Each one can be overridden for a single invocation with a `TODO_`-prefixed environment variable (`showCompleted` → `TODO_SHOW_COMPLETED`), which takes precedence over the file.

| Setting | Type | Default | Env override |
| --- | --- | --- | --- |
| `store` | string | `todos.json` | `TODO_STORE` |
| `showCompleted` | boolean | `true` | `TODO_SHOW_COMPLETED` |

Run `config schema --json` for the same table generated from the code.

```sh
node bin/config.js schema             # list every setting with type, default, and env var
node bin/config.js init               # write a .todorc.json from the defaults
node bin/config.js path               # print the config file location
node bin/config.js                    # print all settings
node bin/config.js showCompleted      # print one setting
node bin/config.js showCompleted false  # set one setting
```
