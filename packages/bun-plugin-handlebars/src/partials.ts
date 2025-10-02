import { join, parse } from 'node:path';
import { join as joinPosix } from 'node:path/posix';
import hbs from 'handlebars';

export const registerPartials = async (directoryPath: string | string[]) => {
  const directories = Array.isArray(directoryPath)
    ? directoryPath
    : [directoryPath];

  const glob = new Bun.Glob('**/*.{html,hbs}');

  for (const baseDir of directories) {
    const files = await Array.fromAsync(
      glob.scan({ cwd: baseDir, absolute: false }),
    );

    for (const filePath of files) {
      const absolutePath = join(baseDir, filePath);
      const template = await Bun.file(absolutePath).text();

      const parsedPath = parse(filePath);
      const normalizedPath = parsedPath.dir.replace(/\\/g, '/');
      const partialName = joinPosix(normalizedPath, parsedPath.name);

      hbs.registerPartial(partialName, template);
    }
  }
};
