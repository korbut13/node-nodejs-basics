import { argv } from 'node:process';

const parseArgs = () => {
  const args = argv.slice(2);
  let result = '';
  args.forEach((arg, ind) => {
    result = ind === 0 || ind % 2 === 0 ? `${result + arg.slice(2)} is ${args[ind + 1]}, ` : `${result + ''}`
  })
  console.log(result.trim().slice(0, -1));
};

parseArgs();
