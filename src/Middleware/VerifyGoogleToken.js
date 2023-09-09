const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_ID_TOKEN);

const verifyGoogleToken = async ( token, req) => {
    try {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID_TOKEN,
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];

        req.userId = userId;
        
    } catch (error) {
        throw new Error(`not valid Token`, error);
    }
};

module.exports = verifyGoogleToken;
