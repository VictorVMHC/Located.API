const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.LOCATED_EMAIL,
        pass: process.env.LOCATED_EMAIL_PASSWORD,
    },
});

module.exports = {
    transporter
};