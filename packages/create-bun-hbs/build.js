import { resolve } from 'node:path';
import handlebars from 'bun-plugin-handlebars';

export async function buildProject() {
  const result = await Bun.build({
    entrypoints: ['src/index.html'],
    outdir: 'dist',
    plugins: [
      handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
      }),
    ],
  });

  if (result.success) {
    console.log('\x1b[32m%s\x1b[0m', 'Build complete.');
  } else {
    console.error('Build failed:', result.logs);
  }
}

console.log('Building project...');

buildProject();
