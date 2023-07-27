const { Schema, model } = require('mongoose');

const VerifyEmailSchema = Schema({
    email: {
        type: String,
        required: [true, "The email is a required field"],
        unique: true,
    },
    code:{
        type: String,
        required: [true, "The code is a required field"],
    },
    createdAt: {
        type: Date,
        expire: '10m',
        default: Date.now()
    }
});

VerifyEmailSchema.methods.toJSON = function() {
    const {...verifyUser} = this.toObject({ versionKey: false });
    return verifyUser;
}

module.exports = model('VerifyEmail', VerifyEmailSchema);