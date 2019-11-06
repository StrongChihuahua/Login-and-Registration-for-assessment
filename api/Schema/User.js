const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },
    password: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
