const {Schema, model} = require('mongoose');

const LikeCommentSchema = Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "The User Id is a required field"]
    },
    commentId:{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: [true, "The Comment Id is a required field"]
    },
    state:{
        type: Boolean,
    },
});

module.exports = model('LikeComment', LikeCommentSchema );