const { Router } = require('express');
const {replyPost} = require('../Controllers/Reply')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();

router.post('/:_id/:_id2',
    [
        check('replied', 'The replies is mandatory').notEmpty(),
        validationResults
    ],replyPost);

module.exports = router;