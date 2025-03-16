const fs = require('fs');
const screenshot = require('screenshot-desktop');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { createFolder, deleteFolder, deleteFile } = require('../utils/fileUtils');

let captureInterval;
let sessionCode = null;

const startCapture = (req, res) => {
    sessionCode = uuidv4();
    const folderPath = path.join(__dirname, '../screenshots', sessionCode);

    createFolder(folderPath);

    captureInterval = setInterval(() => {
        const filePath = path.join(folderPath, `${Date.now()}.png`);
        screenshot({ format: 'png' })
            .then((img) => fs.writeFileSync(filePath, img))
            .catch((err) => console.error('Screenshot error:', err));
    }, 30000);

    res.json({ message: 'Capturing screenshots started!', sessionCode });
};

const stopCapture = (req, res) => {
    const { emails } = req.body;

    if (!sessionCode) {
        return res.status(400).json({ message: 'No active session!' });
    }

    clearInterval(captureInterval);

    const folderPath = path.join(__dirname, '../screenshots', sessionCode);
    const zipPath = path.join(__dirname, '../screenshots', `${sessionCode}.zip`);

    const { createZip } = require('../utils/zipUtils');
    createZip(folderPath, zipPath, (err) => {
        if (err) {
            console.error('❌ Zip error:', err);
            return res.status(500).json({ message: 'Failed to zip screenshots' });
        }

        const { sendEmail } = require('./emailController');
        sendEmail(emails, zipPath, sessionCode, (emailError) => {
            if (emailError) {
                return res.status(500).json({ message: 'Failed to send email' });
            }

            deleteFolder(folderPath);
            deleteFile(zipPath);
            sessionCode = null;

            res.json({ message: 'Screenshots sent and session cleared!' });
        });
    });
};

module.exports = { startCapture, stopCapture };
