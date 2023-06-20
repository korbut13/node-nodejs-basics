import { appendFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';


const create = async () => {
  const path = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fresh.txt');
  const context = 'I am fresh and young';
  try {
    await appendFile(path, context, { encoding: 'utf8', mode: 0o666, flag: 'ax' });
  } catch ({ code }) {
    if (code === 'EEXIST') {
      throw new Error("FS operation failed");
    }
  }
};

await create();
