const {Schema, model} = require ('mongoose');

const LocalsSchema = Schema({
    name:{
        type: String,
        require: [true, "The name is a required field"],
        unique: true,
    },
    address:{
        type: String,
        require: [true, "The adress is a required field"]
    },
    uriImage:{
        type: String,
    },
    isVerify:{
        type: Boolean,
        default: false
    },
    products:{
        type: String,
    },
    schedules:{
        type: String,
        require: [true, "The schedule is a required field"]
    },
    rate:{
        type: Number,
    },
    quantityRate:{
        type: Number,
    },
    tags:{
        type: String,
    },
    state:{
        type: Boolean,
    },
})

LocalsSchema.methods.toJSON = function(){
    const{...locals} = this.toObject();
    return locals;
}

module.exports = model('Locals', LocalsSchema);