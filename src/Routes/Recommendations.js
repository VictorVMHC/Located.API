const { Router } = require('express');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { verifyToken } = require('../Middleware/VerifyToken');
const { getRecommendations } = require('../Controllers/Recommendations');

const router = Router();

/**
 * Get the recommendation  
 *
 * @route GET api/recommendations/
 * @param {json property} x-token -> x-token of the reply
 * @returns {reply} 200-> If there are some recommendations for the user
 * @throws {information} if something went wrong during the process to get the recommendations
 */
router.get('/',
    [
        check('x-token', 'Token is require').notEmpty(),
        check('x-token', 'Token is not a JWT').isJWT(),
        check('x-token', 'Token validation').custom(async (value, { req }) => verifyToken(value, req)),
        validationResults
    ], getRecommendations);

module.exports = router;