import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stdout } from 'node:process'
import { fork } from 'node:child_process'

const spawnChildProcess = async (args) => {
  const src = join(dirname(fileURLToPath(import.meta.url)), 'files', 'script.js');
  const child = fork(src, args, {
    stdio: [0, 1, 2, 'ipc'],
  }).on('close', (code) => {
    stdout.write(`Exited with code: ${code}`);
  });
};

spawnChildProcess([1, 2, 3]);
