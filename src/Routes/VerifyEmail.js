const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const { verifyToken} = require('../Middleware/VerifyToken');
const { addEmailToVerify, verifyCode, verifyDelete, emailToVerify, verifiedEmailToPassword } = require('../Controllers/VerifyEmail');
const { existEmail } = require('../helpers/DbValidations');

const router = Router();

router.post('/',[
    check('email', 'The email is mandatory').notEmpty(),
    check('email', 'The email does not have a correct format').isEmail(),
    check('email', "The email is already registered").custom(existEmail),
    validationResults,
], addEmailToVerify);

router.get('/:email/:code',[
    check('code', 'Token is require').notEmpty(),
    check('email', 'The email is mandatory').notEmpty(),
    check('email', 'The email does not have a correct format').isEmail(),
    validationResults,
], verifyCode);

router.get('/:email/lang/:lang',[
    check('email', "The email must not to be empty").notEmpty(),
    check('email', "the email needs to be in the correct format").isEmail(),
    validationResults
], verifiedEmailToPassword);

router.delete('/:email',[
    check('email', "The email must not to be empty").notEmpty(),
    check('email', "the email needs to be in the correct format").isEmail(),
    validationResults
], verifyDelete);

module.exports = router;