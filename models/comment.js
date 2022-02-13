const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentShema = new Schema({
    email: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    msg: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentShema);
