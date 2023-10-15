const { Router } = require('express');
const {likeReplyPost, likeReplyGet, likeReplyDelete} = require('../Controllers/LikeReply')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { verifyToken } = require('../Middleware/VerifyToken');

const router = Router();

router.post('/',
    [
        check('x-token', 'Token is require').notEmpty(),
        check('x-token', 'Token is not a JWT').isJWT(),
        check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
        check('replyId', 'The replyId is mandatory').notEmpty(),
        validationResults
    ],likeReplyPost);

    router.get('/:Id',
    [
        check('Id', "The Id must not be empty").notEmpty(),
        validationResults
    ],likeReplyGet);
    
    router.delete('/:replyId',[
        check('x-token', 'Token is require').notEmpty(),
        check('x-token', 'Token is not a JWT').isJWT(),
        check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
        check('replyId', 'The ID is mandatory').notEmpty(),
        validationResults
    ], likeReplyDelete);

module.exports = router; 