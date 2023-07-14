const { Router } = require('express');
const {replyPost, replyGet, replyPut, replyDelete} = require('../Controllers/Reply')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();


/**
 * Create a new Reply 
 *
 * @route GET api/reply/:commentId/:userId
 * @param {json property} replied -> replied of the reply
 * @returns {reply} 200-> if the reply have been created and the params which the reply was created
 * @throws {information} if the body params is no in the correct format and if the reply is already in place
 */
router.post('/:_id/:_id2',
    [
        check('replied', 'The replies is mandatory').notEmpty(),
        validationResults
    ],replyPost);

    /**
 * Get the information of the Reply by replyId
 *
 * @route GET api/reply/:replyId
 * @param {} replyId - unique replyId of the reply
 * @returns {object} reply information
 * @throws {Error} If the reply doesn't exist
 */
router.get('/:Id',
[
    check('Id', "The Id must not be Reply").notEmpty(),
    validationResults
],replyGet);

router.put('/:Id',[
    check('Id', 'The ID is mandatory').notEmpty(),
    validationResults
], replyPut);

router.delete('/:Id',[
    check('Id', 'The ID is mandatory').notEmpty(),
    validationResults
], replyDelete);

module.exports = router;