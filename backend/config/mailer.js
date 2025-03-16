const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_EMAIL_PASSWORD,
    },
});

module.exports = transporter;
