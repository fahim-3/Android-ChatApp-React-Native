const mongoose = require('mongoose');

const GroupsSchema = mongoose.Schema({
    Groupname: String,
    UserId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', GroupsSchema);