const { Router } = require('express');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { verifyToken } = require('../Middleware/VerifyToken');
const router = Router();
const { GuestUserPost, GuestUserDelete } = require('../Controllers/GuestUser');

/**
 * Create a new user 
 *
 * @route POST /api/users/guest
 * @returns {object} token
 */
    router.post('/', GuestUserPost);

/**
 * Get the information of the user by username
 *
 * @route DELETE api/users/guest
 * @returns {object} The guest user Deleted
 * @throws {Error} If the was not possible to delete the user 
 */
    router.delete('/',[
        check('x-token', 'Token is require').notEmpty(),
        check('x-token', 'Token is not a JWT').isJWT(),
        check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
        validationResults
    ], GuestUserDelete );

module.exports = router; 