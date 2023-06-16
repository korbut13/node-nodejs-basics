import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const list = async () => {
  const srcFolder = join(dirname(fileURLToPath(import.meta.url)), 'files');
  try {
    const files = await readdir(srcFolder);
    console.log(files);
  } catch (err) {
    throw new Error('FS operation failed')
  }
};

await list();
