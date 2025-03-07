const fs = require('fs-extra');
const path = require('path');

const sourceFolder = path.join(__dirname, 'dist/browser');
const distFolder = path.join(__dirname, '../dist');

async function copyFiles() {
    try {
        await fs.copy(sourceFolder, distFolder);
        console.log('All files copied successfully!');
    } catch (err) {
        console.error('Error copying files:', err);
    }
}
console.log(sourceFolder)
console.log(distFolder)
copyFiles();
