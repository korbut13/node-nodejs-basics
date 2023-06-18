import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const calculateHash = async () => {
  const srcFile = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToCalculateHashFor.txt');
  try {
    const content = await readFile(srcFile, { encoding: 'utf8' });
    const hash = createHash('sha256');
    hash.update(content);
    console.log(hash.digest('hex'));
  } catch (err) {
    console.error(err)
  }
};

await calculateHash();
