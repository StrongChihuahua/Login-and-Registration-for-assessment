const mongoose = require('mongoose');

const postSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    comments: [{
        post_id: String,
        comment_id: mongoose.Schema.Types.ObjectId,
        author: {
            type: String,
            required: true
        },
        comment_body: {
            type: String,
            required: true
        },
        created_on: { type: Date, default: Date.now }
    }],
    post_author: {
        type: String,
        required: true
    },
},  {
    timestamps: true
    }
);

module.exports = mongoose.model('Post', postSchema);
