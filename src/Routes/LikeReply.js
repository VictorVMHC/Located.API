const { Router } = require('express');
const {likeReplyPost, likeReplyGet, likeReplyDelete} = require('../Controllers/LikeReply')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();

router.post('/',
    [
        check('userId', 'The userId is mandatory').notEmpty(),
        check('replyId', 'The replyId is mandatory').notEmpty(),
        validationResults
    ],likeReplyPost);

    router.get('/:Id',
    [
        check('Id', "The Id must not be empty").notEmpty(),
        validationResults
    ],likeReplyGet);
    
    router.delete('/:Id',[
        check('Id', 'The ID is mandatory').notEmpty(),
        validationResults
    ], likeReplyDelete);

module.exports = router; 