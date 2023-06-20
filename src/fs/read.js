import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
  const srcFile = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToRead.txt');
  try {
    const content = await readFile(srcFile, { encoding: 'utf8' });
    console.log(content);
  } catch (err) {
    throw new Error('FS operation failed')
  }
};

await read();
