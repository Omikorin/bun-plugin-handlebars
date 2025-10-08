# bun-plugin-hbs

A Bun plugin for compiling and rendering Handlebars templates, with support for partials and custom helpers.

> **Note:** This plugin uses [Handlebars](https://handlebarsjs.com/) under the hood. If you are new to Handlebars or need a refresher on its syntax, features, or concepts (such as partials, helpers, and context), please refer to the [official Handlebars documentation](https://handlebarsjs.com/).

## Installation

```bash
bun add -D bun-plugin-hbs
```

## Usage

You can use this plugin directly in your Bun build scripts, or quickly scaffold a new project using the [create-bun-hbs template](https://github.com/Omikorin/bun-plugin-handlebars/tree/main/packages/create-bun-hbs) for a ready-to-use setup and examples.

Import and configure the plugin in your Bun build script:

```js
// build.js
import handlebars from 'bun-plugin-hbs';

export async function buildProject() {
  await Bun.build({
    plugins: [handlebars()],
  });
}

buildProject();
```

## Configuration

### Context

Pass a context object to inject data into your templates:

```html
<!-- index.html -->
<p>Quote of the day: {{quote}}</p>
```

```js
// build.js
import handlebars from 'bun-plugin-hbs';

export async function buildProject() {
  await Bun.build({
    plugins: [
      handlebars({
        context: {
          quote: 'E=mc² - Albert Einstein',
        },
      }),
    ],
  });
}
```

### Partials

Prepare HTML templates:

```html
<!-- index.html -->
{{> head }}

<div>{{> layout/nested}}</div>
```

```html
<!-- partials/head.html -->
<title>Handlebars example</title>
```

```html
<!-- partials/layout/nested.html -->
<p>Nested partial test</p>
```

Register partials by specifying a directory (or array of directories):

```js
import { resolve } from 'node:path';
import handlebars from 'bun-plugin-hbs';

export async function buildProject() {
  const result = await Bun.build({
    plugins: [
      handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
      }),
    ],
  });
}
```

All `.html` and `.hbs` files in the directory will be registered as partials.

### Helpers

Add custom helpers by passing a helpers object:

```js
import handlebars from 'bun-plugin-hbs';

export async function buildProject() {
  const result = await Bun.build({
    plugins: [
      handlebars({
        helpers: {
          eq: (a, b) => a === b,
          uppercase: (str) => str.toUpperCase(),
        },
      }),
    ],
  });
}
```

## Example

```js
import { resolve } from 'node:path';
import handlebars from 'bun-plugin-hbs';

export async function buildProject() {
  await Bun.build({
    entrypoints: ['src/index.html'],
    outdir: 'dist',
    plugins: [
      handlebars({
        context: {
          quote: 'E=mc² - Albert Einstein',
          items: ['Naruto', 'Steins;Gate', 'Bleach'],
        },
        partialDirectory: resolve(__dirname, 'src/partials'),
        helpers: {
          eq: (a, b) => a === b,
          uppercase: (str) => str.toUpperCase(),
        },
      }),
    ],
  });
}

buildProject();
```

## API

### Plugin Options

| Option             | Type                 | Description                           |
| ------------------ | -------------------- | ------------------------------------- |
| `context`          | `object`             | Data passed to templates              |
| `compileOptions`   | `object`             | Handlebars compile options            |
| `runtimeOptions`   | `object`             | Handlebars runtime options            |
| `partialDirectory` | `string \| string[]` | Directory or directories for partials |
| `helpers`          | `object`             | Custom Handlebars helpers             |

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is licensed under the [ISC license](https://github.com/Omikorin/bun-plugin-handlebars/blob/main/LICENSE).

---

<p align="center">Made with 🩵 by Michał Korczak</p>

---
