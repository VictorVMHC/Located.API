const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const { verifyToken} = require('../Middleware/VerifyToken');
const { addEmailToVerify, verifyCode } = require('../Controllers/VerifyEmail');

const router = Router();

router.post('/',[
    check('email', 'The email is mandatory').notEmpty(),
    check('email', 'The email does not have a correct format').isEmail(),
    validationResults,
], addEmailToVerify);

router.get('/',[
    check('code', 'Token is require').notEmpty(),
    check('email', 'The email is mandatory').notEmpty(),
    check('email', 'The email does not have a correct format').isEmail(),
    validationResults,
], verifyCode);

module.exports = router;