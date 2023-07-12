const jwt = require('jsonwebtoken');

const verifyToken = (token = '', req) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new Error('Invalid token or expired', err);
    } else {
      req.tokenDecoded = decoded;
    }
  });
}

module.exports = {
  verifyToken
}