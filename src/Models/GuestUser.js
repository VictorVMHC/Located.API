const { Schema, model } = require('mongoose');

const GuestUserSchema = Schema({
    createdAt: {
        type: Date,
        expires: '86400s',
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