const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña',
    },
});

const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: 'destinatario@correo.com',
    subject: 'Asunto del correo',
    text: 'Cuerpo del correo electrónico',
};


transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error al enviar el correo: ', error);
    } else {
        console.log('Correo enviado correctamente: ', info.response);
    }
});
