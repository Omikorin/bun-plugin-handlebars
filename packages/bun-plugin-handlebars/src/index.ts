import type { BunPlugin } from 'bun';
import hbs, { type RuntimeOptions} from 'handlebars';

import { registerPartials } from './partials';

type Context = Record<string, unknown>;

type CompileArgs = Parameters<typeof hbs.compile>;
type CompileOptions = CompileArgs[1];

export interface PluginConfig {
  context?: Context;
  compileOptions?: CompileOptions;
  runtimeOptions?: RuntimeOptions;
  partialDirectory?: string | string[];
}

export default function handlebars({
  context,
  compileOptions,
  runtimeOptions,
  partialDirectory,
}: PluginConfig = {}): BunPlugin {
  return {
    name: 'handlebars',
    target: 'bun',

    setup(builder) {
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
