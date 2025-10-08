# Bun plugin Handlebars

A Bun plugin for integrating Handlebars templating into your Bun projects.

## Monorepo structure

This project is a monorepo managed with Bun workspaces. It contains the following packages:

| Package                                      | Description                                                        |
| -------------------------------------------- | ------------------------------------------------------------------ |
| [bun-plugin-hbs](./packages/bun-plugin-hbs/) | Integrates Handlebars, including support for partials and helpers. |
| [create-bun-hbs](./packages/create-bun-hbs/) | A template for setting up Bun projects with Handlebars.            |

## Usage

### Using the plugin

Install the plugin:

```bash
bun add -D bun-plugin-hbs
```

See the [bun-plugin-hbs README](./packages/bun-plugin-hbs/) for detailed usage instructions, API documentation, and code examples.

### Using the project template

If you want to quickly scaffold a new Bun project with Handlebars integration, use the command below:

```bash
bun create bun-hbs
```

This provides a starter template with example templates and partials.

See the [create-bun-hbs README](./packages/create-bun-hbs/) for setup steps and example usage.

## Development

Install all dependencies for the monorepo:

```bash
bun install
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is licensed under the [ISC license](./LICENSE).

---

<p align="center">Made with 🩵 by Michał Korczak</p>

---
