import { symlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildLegislationDirectory(name) {
    // Define the source and target folders for the symbolic link
    const sourceFolder = __dirname+'/legislation/'+name;
    const targetFolder = __dirname +'/src/content/legislation/'+name;

    // Create a symbolic link
    const symlinkPath = join(targetFolder);
    if (!fs.existsSync(symlinkPath)) {
        await symlink(sourceFolder, symlinkPath, 'dir');
    }
}

buildLegislationDirectory("2023")
buildLegislationDirectory("2024")
