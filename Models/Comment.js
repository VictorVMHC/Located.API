const {Schema, model} = require('mongoose');

const CommentSchema = Schema({
    localId:{
        type: Schema.Types.ObjectId,
        ref: 'Locals'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:{
        type: String,
        required: [true, "The comment is a required field"]
    },
    like:{
        type: String,
    },
    dislike:{
        type: String,
    },
    state:{
        type: Boolean,
    },
    replies:[{
        type: Schema.Types.ObjectId,
        ref: 'Reply'
    }]
});

module.exports = model('Comment', CommentSchema );