const { Router } = require('express');
const {commentPost, commentGet,commentPut, commentDelete, searchByLocalId} = require('../Controllers/Comment')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { verifyToken } = require('../Middleware/VerifyToken');

const router = Router();

/**
 * Create a new Comment 
 *
 * @route GET api/comment/
 * @param {json property} localId -> localId of the Comment
 * @param {json property} userId -> userId of the Comment
 * @param {json property} comments -> comments of the Comment
 * @returns {comment} 200-> if the Comment have been created and the params which the Comment was created
 * @throws {information} if the body params is no in the correct format and if the Comment is already in place
 */
router.post('/', [
    check('localId', 'The localId is mandatory').notEmpty(),
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
    check('comment', 'The comment is mandatory').notEmpty(), 
    validationResults
],commentPost);

/**
 * Get the information of the Comment by commentId
 *
 * @route GET api/comment/:commentId
 * @param {} commentId - unique commentId of the comment
 * @returns {object} reply information
 * @throws {Error} If the comment doesn't exist
 */
router.get('/:Id',[
    check('Id', "The Id must not be empty").notEmpty(),
    validationResults
],commentGet);

/**
 * Get the information of the Comment by commentId
 *
 * @route GET api/comment/:commentId
 * @param {} localId - unique commentId of the comment
 * @returns {object} reply information
 * @throws {Error} If the comment doesn't exist
 */
router.get('/localId/:localId',[
    check('localId', "The local local Id must not to be empty").notEmpty(),
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
    validationResults
], searchByLocalId);

router.put('/:Id',[
    check('Id', 'The Id is mandatory').notEmpty(),
    validationResults
], commentPut);

router.delete('/:Id',[
    check('Id', 'The Id is mandatory').notEmpty(),
    validationResults
], commentDelete);


module.exports = router; 