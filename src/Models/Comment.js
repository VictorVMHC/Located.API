const {Schema, model} = require('mongoose');

const CommentSchema = Schema({
    localId:{
        type: Schema.Types.ObjectId,
        ref: 'Locals',
        required: [true, "The localId is a required field"]
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "The userId is a required field"]
    },
    comment:{
        type: String,
        required: [true, "The comment is a required field"]
    },
    label: {
        type: String,
        enum: ["positive", "neutral", "negative"],
        required:  [true, "The label is a required field"]
    },
    state:{
        type: Boolean,
    },
});

module.exports = model('Comment', CommentSchema );