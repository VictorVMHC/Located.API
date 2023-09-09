const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const { existEmail } = require('../helpers/DbValidations');
const verifyGoogleToken = require('../Middleware/VerifyGoogleToken');
const { googleUserPost } = require('../Controllers/GoogleUser');

const router = Router();

router.post('/',[
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(verifyGoogleToken),
    check('email', "The email must not to be empty").notEmpty(),
    check('email', "The email is no valid").isEmail(),
    check('email', "Email already registered").custom(existEmail),
    validationResults,
], googleUserPost);

module.exports = router;