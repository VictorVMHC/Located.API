const {Schema, model} = require('mongoose');

const LikeReplySchema = Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "The User Id is a required field"]
    },
    replyId:{
        type: Schema.Types.ObjectId,
        ref: 'Reply',
        required: [true, "The Reply Id is a required field"]
    },
    state:{
        type: Boolean,
    },
});

module.exports = model('LikeReply', LikeReplySchema );