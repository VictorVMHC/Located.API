const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const { existEmail, existPhone, existUserName } = require('../helpers/DbValidations');
const { getCheckUserInfo } = require('../Controllers/VerifyUserInfo');

const router = Router();

router.post('/',[
    check('name', 'The username is mandatory').notEmpty(),
    check('password', 'The password is mandatory').notEmpty(),
    check('password', 'The password needs to have a min length of 8, at last 1 Uppercase, 1 number ans 1 symbol')
        .isStrongPassword({minLength:8, minUppercase:1, minNumbers:1, minSymbols:1 }),
    check('email', "The email must not to be empty").notEmpty(),
    check('email', "The email is no valid").isEmail(),
    check('email', "The email is no valid").custom(existEmail),
    check('phone', 'The needs to be an string').isString(),
    check('phone', 'The phone number must not have alpha characters').matches(/^[^a-zA-Z]+$/),
    check('phone', 'The phone number needs to be between 10 - 15 digits').isLength({max: 15, min: 10}),
    check('phone', 'The needs to be unique').custom(existPhone),
    check('username', 'The username must to be unique').custom(existUserName),
    validationResults,
], getCheckUserInfo );


module.exports = router;