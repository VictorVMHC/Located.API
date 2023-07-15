const { Router } = require('express');
const {commentPost, commentGet,commentPut, commentDelete} = require('../Controllers/Comment')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();

/**
 * Create a new Comment 
 *
 * @route GET api/comment/:userId/:localId
 * @param {json property} localId -> localId of the Comment
 * @param {json property} userId -> userId of the Comment
 * @param {json property} comments -> comments of the Comment
 * @returns {comment} 200-> if the Comment have been created and the params which the Comment was created
 * @throws {information} if the body params is no in the correct format and if the Comment is already in place
 */
router.post('/',
    [
        check('localId', 'The localId is mandatory').notEmpty(),
        check('userId', 'The userId is mandatory').notEmpty(),
        check('comments', 'The comments is mandatory').notEmpty(), 
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
router.get('/:Id',
    [
        check('Id', "The Id must not be empty").notEmpty(),
        validationResults
    ],commentGet);

router.put('/:Id',[
    check('Id', 'The ID is mandatory').notEmpty(),
    validationResults
], commentPut);

router.delete('/:Id',[
    check('Id', 'The ID is mandatory').notEmpty(),
    validationResults
], commentDelete);




module.exports = router; 