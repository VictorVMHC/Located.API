const { Router } = require('express');
const {likeCommentPost, likeCommentGet, likeCommentDelete} = require('../Controllers/LikeComments')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { verifyToken } = require('../Middleware/VerifyToken');

const router = Router();

router.post('/',
    [
        check('commentId', 'The commentId is mandatory').notEmpty(),
        check('x-token', 'Token is require').notEmpty(),
        check('x-token', 'Token is not a JWT').isJWT(),
        check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
        validationResults
    ],likeCommentPost);

    router.get('/:Id',
    [
        check('Id', "The Id must not be empty").notEmpty(),
        validationResults
    ],likeCommentGet);
    
    router.delete('/:commentId',[
        check('commentId', 'The comment id is mandatory').notEmpty(),
        check('x-token', 'Token is require').notEmpty(),
        check('x-token', 'Token is not a JWT').isJWT(),
        check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
        validationResults
    ], likeCommentDelete);

module.exports = router; 