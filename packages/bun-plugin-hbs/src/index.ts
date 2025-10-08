import type { BunPlugin } from 'bun';
import hbs, { type HelperDeclareSpec, type RuntimeOptions } from 'handlebars';

import { registerPartials } from './partials';

type Context = Record<string, unknown>;

type CompileArgs = Parameters<typeof hbs.compile>;
type CompileOptions = CompileArgs[1];

export interface PluginConfig {
  context?: Context;
  compileOptions?: CompileOptions;
  runtimeOptions?: RuntimeOptions;
  partialDirectory?: string | string[];
  helpers?: HelperDeclareSpec;
}

export default function handlebars({
  context,
  compileOptions,
  runtimeOptions,
  partialDirectory,
  helpers,
}: PluginConfig = {}): BunPlugin {
  return {
    name: 'handlebars',
    target: 'bun',

    setup(builder) {
      if (helpers) {
        hbs.registerHelper(helpers);
      }

      builder.onLoad({ filter: /\.html$/ }, async (args) => {
        if (partialDirectory) {
          await registerPartials(partialDirectory);
        }

        const html = await Bun.file(args.path).text();
        const template = hbs.compile(html, compileOptions);
        const contents = template(context || {}, runtimeOptions);

        return {
          contents,
          loader: 'html',
        };
      });
    },
  };
}
