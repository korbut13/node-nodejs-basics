import { access, mkdir, readdir, copyFile } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const copy = async () => {
  const srcPath = join(dirname(fileURLToPath(import.meta.url)), 'files');
  const destPath = join(dirname(fileURLToPath(import.meta.url)), 'files_copy');

  access(destPath, (err) => {
    if (err) {
      mkdir(destPath, (err) => {
        if (err) throw err;
      });
      readdir(srcPath, (err, files) => {
        if (err) {
          throw new Error('FS operation failed')
        } else {
          for (const file of files) {
            const sourceFile = join(srcPath, file);
            const targetFile = join(destPath, file);
            copyFile(sourceFile, targetFile, (err) => {
              if (err) throw err;
            })
          }
        }
      });
    } else {
      throw new Error('FS operation failed')
    }
  })
};

await copy();
