import { symlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the source and target folders for the symbolic link
const sourceFolder = __dirname+'/legislation/2023';
const targetFolder = __dirname +'/src/content/legislation/2023';

// Create a symbolic link
const symlinkPath = join(targetFolder);
await symlink(sourceFolder, symlinkPath, 'dir');
