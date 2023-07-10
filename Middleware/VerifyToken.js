const jwt = require('jsonwebtoken');

const verifyToken = ( req, res, next ) => {
    const token = req.headers['accsses'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          // El token es inválido o ha expirado
          res.status(401).json({ valid: false, error: 'Token inválido o expirado' });
        } else {
          // El token es válido
          res.status(200).json({ valid: true, decoded: decoded });
        }
      });
    next();
}

module.exports = {
    verifyToken
}