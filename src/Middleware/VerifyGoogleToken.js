const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_ID_TOKEN); // Reemplaza con tu ID de cliente de Google

const verifyGoogleToken = async ( token, req) => {
    try {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID_TOKEN, // Reemplaza con tu ID de cliente de Google
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];

        // Puedes agregar el ID de usuario verificado a la solicitud para que el controlador lo utilice
        req.userId = userId;
        
    } catch (error) {
        console.error('Error al verificar el token de Google:', error);
        throw new Error(`Token no válido`);
    }
};

module.exports = verifyGoogleToken;
