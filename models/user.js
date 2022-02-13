const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userShema);
