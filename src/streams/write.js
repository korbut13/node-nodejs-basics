import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const write = async () => {
  const destination = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToWrite.txt');
  const output = createWriteStream(destination);
  stdin.on('data', (chunk) => output.write(chunk));
};

await write();
