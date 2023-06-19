import { createReadStream, createWriteStream } from 'node:fs'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { promisify } from "util";

const compress = async () => {
  const src = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToCompress.txt');
  const dest = join(dirname(fileURLToPath(import.meta.url)), 'files', 'archive.gz');

  const pipe = promisify(pipeline);

  const readStream = createReadStream(src);
  const writeStream = createWriteStream(dest);

  const gzipStream = createGzip();

  try {
    await pipe(readStream, gzipStream, writeStream);
  } catch (err) {
    console.error(err);
  }
};

await compress();
