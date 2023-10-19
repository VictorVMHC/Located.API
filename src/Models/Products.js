const { Schema, model } = require('mongoose');

const ProductsSchema = Schema({
    productName: {
        type: String,
        required: [true, "The name is a required field"]
    },
    localId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: String,
        required: [true, "The price is a required field"]
    },
    img: {
        type: String,
    },
    punctuation: {
        type: String,
    },
    description: {
        type: String,
    },
    tags: {
        type: [],
    },
});

ProductsSchema.methods.toJSON = function(){
    const {...products} = this.toObject({ versionKey: false });
    return products;
}

module.exports = model('Products', ProductsSchema);