import { access, constants, rename as renameFile } from 'node:fs'
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rename = async () => {
  const srcFolder = join(dirname(fileURLToPath(import.meta.url)), 'files');
  const fileBeforeRename = `${join(srcFolder, 'wrongFilename.txt')}`;
  const fileAfterRename = `${join(srcFolder, 'properFilename.md')}`;

  access(fileAfterRename, constants.F_OK, (err) => {
    if (err) {
      renameFile(fileBeforeRename, fileAfterRename, (err) => {
        if (err) throw new Error('FS operation failed');
      });
    } else {
      throw new Error('FS operation failed');
    }
  })

};

await rename();
