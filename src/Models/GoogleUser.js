const { Schema, model } = require('mongoose');

const GoogleUserSchema = Schema({
    name: {
        type: String,
        required: [true, "The name is a required field"]
    },
    email: {
        type: String,
        required: [true, "The email is a required field"],
        unique: true,
    },
    photo: {
        type: String,
    },
    google: {
        type: Boolean,
        default: true
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
    givenName: {
        type: String,
    },
});

GoogleUserSchema.methods.toJSON = function(){
    const{...googleuser} = this.toObject({ versionKey: false });
    return googleuser;
}

module.exports = model('GoogleUser', GoogleUserSchema);