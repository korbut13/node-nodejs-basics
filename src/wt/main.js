import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';

const src = join(dirname(fileURLToPath(import.meta.url)), 'worker.js');
const cores = cpus();
const initNumber = 10;

const myFun = () => {
  const tasks = cores.map((core, ind) => {
    return new Promise((res, rej) => {
      const worker = new Worker(src, { workerData: initNumber + ind });
      worker.on('message', (value) => {
        res({ status: 'resolved', data: value });
      })
      worker.on('exit', (code) => {
        if (code !== 0) {
          rej({ status: 'error', data: null });
        }
      })
    })
  });
  return Promise.all(tasks);
}


const performCalculations = async () => {
  const result = await myFun();
  console.log(result);
};

await performCalculations();
