const { Schema, model } = require('mongoose');

const GuestUserSchema = Schema({
    logDate:{
        type: Date,
        expire: '1d',
        default: Date.now()
    },
    state:{
        type: Boolean,
        default: true
    },
});

GuestUserSchema.methods.toJSON = function() {
    const { ...GuestUser } = this.toObject({ versionKey: false });
    return GuestUser;
}

module.exports = model('GuestUser', GuestUserSchema);