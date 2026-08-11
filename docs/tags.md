# Tags

Tags are lowercase, `[a-z0-9-]`, and written with or without a leading `#`.
Input is split on whitespace or commas, deduplicated, and sorted.

```sh
node bin/tags.js parse "#Work, urgent work"   # => urgent work
node bin/tags.js count items.json             # => count<TAB>tag, most frequent first
```

`items.json` is a JSON array of objects with an optional `tags` array.
