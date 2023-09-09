const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_ID_TOKEN); // Reemplaza con tu ID de cliente de Google

const verifyGoogleToken = async (req, res, next) => {
  const token = req.headers.x-token; // Supongamos que el token se envía en el cuerpo de la solicitud

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID_TOKEN, // Reemplaza con tu ID de cliente de Google
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];

        // Puedes agregar el ID de usuario verificado a la solicitud para que el controlador lo utilice
        req.userId = userId;
        
        next();
    } catch (error) {
        console.error('Error al verificar el token de Google:', error);
        res.status(401).json({ error: 'Token no válido' });
    }
};

module.exports = verifyGoogleToken;
