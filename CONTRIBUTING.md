## Contributing

Small projects can run into issues when contributors use case-insensitive filesystems (macOS by default) while CI runs on case-sensitive Linux runners. To avoid "Module not found" errors caused by filename case mismatches, follow these local steps before renaming files or committing case-only renames.

### Make Git respect filename case (local setting)

This changes Git's local behavior so it notices case-only renames. Run this in your repository (local only):

```bash
# Make git treat paths as case-sensitive on this clone
git config core.ignorecase false

# Verify the setting
git config core.ignorecase
# output should be: false
```

To revert to the default behavior later:

```bash
git config core.ignorecase true
```

### Safe way to change filename case (works on macOS)

If you need to change `header.js` -> `Header.js`, use a two-step rename so Git records it properly:

```bash
git mv src/components/header/header.js src/components/header/header_tmp.js
git mv src/components/header/header_tmp.js src/components/header/Header.js
git add -A
git commit -m "fix: correct filename case for Header.js"
```

After pushing this commit, CI (Linux) will check out the correctly-cased filename and imports like `import Header from './components/header/Header'` will resolve correctly.

### Why we do this

- macOS default filesystem is case-insensitive; `Header.js` and `header.js` can coexist in working tree but not in Git index without special care.
- Linux runners (like GitHub Actions) are case-sensitive and will fail when import paths don't match actual filenames exactly.

Adding this small step prevents intermittent CI failures and keeps cross-platform development smooth.
