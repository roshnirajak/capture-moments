const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

function createZip(folderPath, zipPath, callback) {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`✔ Zipped ${archive.pointer()} total bytes`);
        callback(null, zipPath);
    });

    archive.on('error', (err) => callback(err));

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
}

module.exports = { createZip };
