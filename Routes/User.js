const { Router } = require('express');
const { userPost } = require('../Controllers/User');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { existEmail } = require('../helpers/DbValitations');

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
        check('email', "The email is no valid").isEmail(),
        check('email', "The email is no valid").custom(existEmail),
        check('phone', 'The needs to be unique').isString(),
        check('phone', 'The phone number must not have alpha characteres').matches(/^[^a-zA-Z]+$/),
        check('phone', 'The phone number needs to be between 10 - 15 digits').isLength({max: 15, min: 10}),
        validationResults
    ],
    userPost);
/**
 * Get the information of the user by username
 *
 * @route GET api/users/:username
 * @param {string} username - unique username of the user
 * @returns {object} User information
 * @throws {Error} If the user doesn't exist
 */
//router.get('/:username', userGet);

//router.delete('/:id');

//router.put('/',);

module.exports = router; 