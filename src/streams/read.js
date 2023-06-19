import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
  const src = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToRead.txt');
  const stream = createReadStream(src, 'utf-8');
  stream.on('data', chunk => console.log(chunk));
  stream.on('end', () => { });
  stream.on('error', (error) => { console.error(error) })
};

await read();
