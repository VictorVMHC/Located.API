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
        required: [true, "The password is a required field"]
    },
    image: {
        type: String,
    },
    phone: {
        type: String,       
        unique: true
    },
    google: {
        type: Boolean,
        default: false
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
        type: String,
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
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

UserSchema.methods.toJSON = function() {
    const {password, ...user} = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);