const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "The name is a required field"]
    },
    email: {
        type: String,
        required: [true, "The email is a required field"],
        unique: true,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    phone: {
        type: String,       
    },
    google: {
        type: Boolean,
        default: false
    },
    googleId:{
        type: String,
    },
    facebook: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
    },
    haveLocals: {
        type: Boolean,
        default: false
    },
    locals:{
        type: [],
    },
    state:{
        type: Boolean,
    },
    username: {
        type: String,
    },
    age: {
        type: Number
    },
});

UserSchema.methods.toJSON = function() {
    const {__v, ...user} = this.toObject({ versionKey: false });
    return user;
}

module.exports = model('User', UserSchema);