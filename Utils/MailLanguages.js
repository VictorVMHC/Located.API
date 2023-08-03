const getMailEs = (code, email) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Código de Verificación</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
            <div style="background-color: #f3f3f3; padding: 20px; text-align: center;">
                <h1>Código de Verificación</h1>
                <p>Hola,</p>
                <p>Tu código de seguridad es:</p>
                <h2 style="background-color: #4CAF50; color: white; padding: 10px; display: inline-block;">${code}</h2>
                <p>Este código es válido por un tiempo limitado y es personal e intransferible. No lo compartas con nadie.</p>
                <p>Gracias por utilizar nuestro servicio.</p>
                <h2>Located App</h2>
            </div>
        </body>
        </html>
    `;

    return mail = {
        from: process.env.LOCATED_EMAIL,
        to: email,
        subject: 'Located - Código de verificación ',
        html: htmlContent
    }
}

const getMailEn = (code, email) => {
    const htmlContent =  `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
        <div style="background-color: #f3f3f3; padding: 20px; text-align: center;">
            <h1>Verification Code</h1>
            <p>Hello,</p>
            <p>Your verification code is:</p>
            <h2 style="background-color: #4CAF50; color: white; padding: 10px; display: inline-block;">${code}</h2>
            <p>This code is valid for a limited time and is personal and non-transferable. Do not share it with anyone.</p>
            <p>Thank you for using our service.</p>
            <h2>Located App</h2>
        </div>
    </body>
    </html>`

    return mail = {
        from: process.env.LOCATED_EMAIL,
        to: email,
        subject: 'Located - Verification Code ',
        html: htmlContent
    }
}

module.exports ={
    getMailEs,
    getMailEn
}