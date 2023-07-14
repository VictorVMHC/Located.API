const {Schema, model} = require('mongoose');

const ReplySchema = Schema({
    commentId:{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
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