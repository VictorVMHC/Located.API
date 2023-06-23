const { Schema, model } = require('mongoose');

const ProductsSchema = Schema({
    productName: {
        type: String,
        required: [true, "The name is a required field"]
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
        type: String, 
    }
});

ProductsSchema.methods.toJSON = function(){
    const {...products} = this.toObject();
    return products;
}

module.exports = model('Products', ProductsSchema);