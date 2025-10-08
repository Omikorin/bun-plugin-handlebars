import type { BunPlugin } from 'bun';
import hbs from 'handlebars';

import { registerPartials } from './partials';

type Context = Record<string, unknown>;

export interface PluginConfig {
  context?: Context;
  partialDirectory?: string | string[];
}

export default function handlebars({
  context,
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
        const template = hbs.compile(html);
        const contents = template(context || {});

        return {
          contents,
          loader: 'html',
        };
      });
    },
  };
}
