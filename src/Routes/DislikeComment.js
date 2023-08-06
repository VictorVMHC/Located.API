const { Router } = require('express');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { DislikeCommentPost, DislikeCommentGet, DislikeCommentDelete } = require('../Controllers/DislikeComment');
const router = Router();

router.post('/',
    [
        check('userId', 'The userId is mandatory').notEmpty(),
        check('commentId', 'The commentId is mandatory').notEmpty(),
        validationResults
    ],DislikeCommentPost);

    router.get('/:Id',
    [
        check('Id', "The Id must not be empty").notEmpty(),
        validationResults
    ],DislikeCommentGet);
    
    router.delete('/:Id',[
        check('Id', 'The ID is mandatory').notEmpty(),
        validationResults
    ], DislikeCommentDelete);

module.exports = router; 