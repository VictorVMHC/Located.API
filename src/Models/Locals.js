const {Schema, model} = require ('mongoose');

const LocalsSchema = Schema({
    name:{
        type: String,
        require: [true, "The name is a required field"],
    },
    description:{
        type: String,
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
        default: true
    },
    products:{
        type: String,
    },
    country:{
        type: String,
    },
    state:{
        type: String,
    },
    town:{
        type: String,
    },
    postalCode:{
        type: String,
    },
    contact: {
        type: {}
    },
    schedules:{
        type: [],
        require: [true, "The schedule is a required field"]
    },
    rate:{
        type: Number,
        default: 0
    },
    quantityRate:{
        type: Number,
        default: 0
    },
    tags:{
        type: [],
    },
    location:{
        type: {}
    },
    open:{
        type: Boolean,
        default: false
    },
    deleted:{
        type: Boolean,
    },
})

LocalsSchema.methods.toJSON = function(){
    const{...locals} = this.toObject({ versionKey: false });
    return locals;
}

module.exports = model('Locals', LocalsSchema);