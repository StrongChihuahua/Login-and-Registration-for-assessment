const mongoose = require('mongoose');

const itemSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    category: [],
    merchant_username: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },
    price: {
        type: Number, 
        required: true
    },
},  {
    timestamps: true
    }
);

module.exports = mongoose.model('Item', itemSchema);
