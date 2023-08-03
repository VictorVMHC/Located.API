const {Schema, model} = require ('mongoose');

const LikeLocalsSchema = Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "The user id it's mandatory"]
    },
    localId:{
        type: Schema.Types.ObjectId,
        ref: 'Locals',
        required: [true, "The local id it's mandatory"]
    },
    state:{
        type: Boolean,
    },
});

module.exports =  model('LikeLocal', LikeLocalsSchema);