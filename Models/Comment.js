const {Schema, model, Mongoose} = require('mongoose');

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
    }
});

module.exports = model('Comment', CommentSchema );