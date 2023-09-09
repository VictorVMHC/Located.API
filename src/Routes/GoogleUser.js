const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const { verifyToken} = require('../Middleware/VerifyToken');
const { addEmailToVerify, verifyCode, verifyDelete } = require('../Controllers/VerifyEmail');
const { existEmail } = require('../helpers/DbValidations');

const router = Router();

router.post('/',[
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
    check('email', "The email must not to be empty").notEmpty(),
    check('email', "The email is no valid").isEmail(),
    validationResults,
], addEmailToVerify);

module.exports = router;