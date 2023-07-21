const {Schema, model} = require ('mongoose');

const LikeProductsSchema = Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "The user id it's mandatory"]
    },
    ProductId:{
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: [true, "The product id it's mandatory"]
    },
    LocalId:{
        type: Schema.Types.ObjectId,
        ref:'Locals',
    },
    state:{
        type: Boolean,
    },

});

module.exports =  model('LikeProduct', LikeProductsSchema);