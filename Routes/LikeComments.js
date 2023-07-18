const { Router } = require('express');
const {likeCommentPost, likeCommentGet, likeCommentPut, likeCommentDelete} = require('../Controllers/LikeComments')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();

router.post('/',
    [
        check('userId', 'The userId is mandatory').notEmpty(),
        check('commentId', 'The commentId is mandatory').notEmpty(),
        validationResults
    ],likeCommentPost);

    router.get('/:Id',
    [
        check('Id', "The Id must not be empty").notEmpty(),
        validationResults
    ],likeCommentGet);

    router.put('/:Id',[
        check('Id', 'The ID is mandatory').notEmpty(),
        validationResults
    ], likeCommentPut);
    
    router.delete('/:Id',[
        check('Id', 'The ID is mandatory').notEmpty(),
        validationResults
    ], likeCommentDelete);

module.exports = router; 