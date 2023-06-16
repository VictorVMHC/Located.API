const { Schema, model } = require('mongoose');

const ProducsSchema = Schema({
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
    punctation: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    tags: {
        type: String, 
    }
});

ProducsSchema.methods.toJSON = function(){
    const {...producs} = this.toObject();
    return producs;
}

module.exports = model('Producs', ProducsSchema);