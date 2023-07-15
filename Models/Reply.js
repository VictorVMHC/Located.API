const {Schema, model} = require('mongoose');

const ReplySchema = Schema({
    commentId:{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: [true, "The CommentId is a required field"]
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "The UserId is a required field"]
    },
    replied:{
        type: String,
        required: [true, "The reply is a required field"]
    },
    state:{
        type: Boolean,
    }
});

module.exports = model('Reply', ReplySchema)