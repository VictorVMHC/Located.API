const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const { AuthLogin, Auth, test } = require('../Controllers/Auth');
const { verifyToken} = require('../Middleware/VerifyToken');

const router = Router();

router.post('/login',[
    check('email', 'The email is mandatory').notEmpty(),
    check('password', 'The password is mandatory').notEmpty(),
    validationResults,
], AuthLogin);

router.get('/',[
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
    validationResults,
], Auth);

router.post('/login/test', test);

module.exports = router;