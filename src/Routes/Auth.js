const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const { AuthLogin, Auth, test, AuthGoogleLogin } = require('../Controllers/Auth');
const { verifyToken} = require('../Middleware/VerifyToken');
const verifyGoogleToken = require('../Middleware/VerifyGoogleToken');

const router = Router();

router.post('/login',[
    check('email', 'The email is mandatory').notEmpty(),
    check('password', 'The password is mandatory').notEmpty(),
    validationResults,
], AuthLogin);

router.post('/google/login',[
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom((value, {req}) => verifyGoogleToken(value, req) ),
    check('email', "The email must not to be empty").notEmpty(),
    check('email', "The email is no valid").isEmail(),
    validationResults,
], AuthGoogleLogin);


router.get('/',[
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
    validationResults,
], Auth);

router.get('/login/test', test);


module.exports = router;