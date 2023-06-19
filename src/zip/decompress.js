import { createReadStream, createWriteStream } from 'node:fs'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { promisify } from "util";

const decompress = async () => {
  const src = join(dirname(fileURLToPath(import.meta.url)), 'files', 'archive.gz');
  const dest = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToCompress.txt');

  const pipe = promisify(pipeline);

  const readStream = createReadStream(src);
  const writeStream = createWriteStream(dest);

  const unzipStream = createUnzip();

  try {
    await pipe(readStream, unzipStream, writeStream);
  } catch (err) {
    console.error(err);
  }

};

await decompress();
