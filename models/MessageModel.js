const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message: String,
    senderId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);