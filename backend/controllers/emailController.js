const transporter = require('../config/mailer');

const sendEmail = (emails, zipPath, sessionCode, callback) => {
    if (!emails || emails.length === 0) {
        return callback(new Error('No emails provided!'));
    }

    const mailOptions = {
        from: `Roshni ${process.env.FROM_EMAIL}`,
        to: emails.join(','),
        subject: '📸 Your Captured Screenshots',
        text: `Here are your screenshots for session: ${sessionCode}!`,
        attachments: [{ filename: `${sessionCode}.zip`, path: zipPath }],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email error:', error);
            return callback(error);
        }

        console.log('Email sent:', info.response);
        callback(null);
    });
};

module.exports = { sendEmail };
