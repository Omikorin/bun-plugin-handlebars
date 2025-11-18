import { mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const projectName = process.argv[2] || 'bun-hbs';

// copy template files
const templateDir = join(__dirname, 'template');
const targetDir = join(process.cwd(), projectName);

await copyDir(templateDir, targetDir);

// gitignore
rename(join(targetDir, 'dot-gitignore'), join(targetDir, '.gitignore'));

// set package name
const pkgPath = join(targetDir, 'package.json');
const pkgJson = JSON.parse(await readFile(pkgPath, 'utf8'));
pkgJson.name = projectName;

await writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));

console.log(`Project ${projectName} files generated!`);


// utils
async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });

  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory())
      await copyDir(srcPath, destPath);
    else
      await writeFile(destPath, await readFile(srcPath));
  }
}
