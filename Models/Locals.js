const {Schema, model} = require ('mongoose');

const LocalsSchema = Schema({

    localId:{
        type: Number,
        //require: [true, "The name is a required field"]
    },
    name:{
        type: String,
        require: [true, "The name is a required field"],
        unique: true,
    },
    adress:{
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
        type: Date,
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
})

LocalsSchema.methods.toJSON = function(){
    const{...locals} = this.toObject();
    return locals;
}

module.exports = model('Locals', LocalsSchema);