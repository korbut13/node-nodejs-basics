import { argv, env } from 'node:process';

const parseEnv = () => {
  let result = '';
  for (let key in env) {
    if (key.includes('RSS')) result = `${result + key}=${env[key]}; `;
  }
  console.log(result.trim().slice(0, -1));
};

parseEnv();
