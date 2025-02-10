Handy and opinionated set of scripts to handle internationalization (i18n) with FormatJS.

These scripts aim to bridge the gap between the source code and the translation process. Preserving existing messages and their translations, ensuring that your localization process is efficient and consistent.

## Usage

To add new messages to your existing catalog include this script in your `package.json`:

```json
"scripts": {
    "translations:add": "formatjs-scripts add --sourceFile 'path/to/extracted/messages.json' --translationsDir 'path/to/translated/messages/dir/'"
}
```

This will merge new extracted messages into each json file containing current catalog, preserving existing translations.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the ISC License.

