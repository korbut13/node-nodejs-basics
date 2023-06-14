import { access, mkdir, readdir, copyFile, constants } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const copy = async () => {
  const srcPath = join(dirname(fileURLToPath(import.meta.url)), 'files');
  const destPath = join(dirname(fileURLToPath(import.meta.url)), 'files_copy')
  try {
    await access(srcPath);
    try {
      if (await access(destPath) === undefined) {
        throw new Error('FS operation failed');
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        await mkdir(destPath, { recursive: false });
        const filesForCopy = await readdir(srcPath);
        for (const file of filesForCopy) {
          const sourceFile = join(srcPath, file);
          const targetFile = join(destPath, file);
          await copyFile(sourceFile, targetFile);
        }
      } else {
        throw new Error('FS operation failed');
      }
    }
  } catch (err) {
    console.error('FS operation failed');
  }

};

await copy();
