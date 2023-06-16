import { unlink } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url'

const remove = async () => {
  const fileToRemove = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToRemove.txt');
  unlink(fileToRemove, (err) => {
    if (err) throw new Error('FS operation failed');
  })
};

await remove();
