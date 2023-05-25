const { Router } = require('express');
const { userPost } = require('../Controllers/User');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');

const router = Router();

router.post('/',
    [
        check('name', 'The username is mandatory').notEmpty(),
        check('password', 'The password is mandatory').notEmpty(),
        check('password', 'The password needs to have a min length of 8, at last 1 Uppercase, 1 number ans 1 symbol')
            .isStrongPassword({minLength:8, minUppercase:1, minNumbers:1, minSymbols:1 }),
        check('email', "The email is no valid").isEmail(),
        check('phone', 'The needs to be unique').isString(),
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