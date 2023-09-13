const { Router } = require('express');
const { userPost, userGet, usersGet,userPut, userPasswordPut, userDelete } = require('../Controllers/User');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { existEmail, existPhone, existUserName } = require('../helpers/DbValidations');
const { verifyToken} = require('../Middleware/VerifyToken');
const router = Router();

/**
 * Create a new user 
 *
 * @route GET api/users/
 * @param {json property} name -> name of the user
 * @param {json property} password -> password of the user
 * @param {json property} email -> email of the user
 * @param {json property} phone -> phone of the user
 * @returns {user} 200-> if the user have been created and the params which the user was created
 * @throws {information} if the body params is no in the correct format and if the user is already in place
 */
router.post('/',
    [
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
        validationResults
    ],
    userPost);
/**
 * Get the information of the user by username
 *
 * @route GET api/users/:username
 * @param {string} email - unique email of the user
 * @returns {object} User information
 * @throws {Error} If the user doesn't exist
 */
router.get('/:email',[
    check('email', "The email must not to be empty").notEmpty(),
    check('email', "the email needs to be in the correct format").isEmail(),
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
    validationResults,
], userGet);

router.get('/', [check(), validationResults], usersGet);

router.put('/',[
    check('password', 'The password needs to have a min length of 8, at last 1 Uppercase, 1 number ans 1 symbol')
        .isStrongPassword({minLength:8, minUppercase:1, minNumbers:1, minSymbols:1 }).optional(),
    check('email', "The email is no valid").isEmail().optional(),
    check('phone', 'The needs to be an string').isString().optional(),
    check('phone', 'The phone number must not have alpha characters').matches(/^[^a-zA-Z]+$/).optional(),
    check('phone', 'The phone number needs to be between 10 - 15 digits').isLength({max: 15, min: 10}).optional(),
    check('phone', 'The needs to be unique').custom(existPhone).optional(),
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
    validationResults
], userPut);

router.put('/changePassword',[
    check('password', 'The password is mandatory').notEmpty(),
    check('newPassword', 'The password is mandatory').notEmpty(),
    check('newPassword', 'The password needs to have a min length of 8, at last 1 Uppercase, 1 number ans 1 symbol')
        .isStrongPassword({minLength:8, minUppercase:1, minNumbers:1, minSymbols:1 }),
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
    validationResults
],userPasswordPut)

router.delete('/:email',[
    check('email', "The email must not to be empty").notEmpty(),
    check('email', "the email needs to be in the correct format").isEmail(),
    validationResults
], userDelete );

module.exports = router; 