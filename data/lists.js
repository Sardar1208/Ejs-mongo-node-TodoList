const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    task: {
        type: String,
        require: true
    },
    priority: {
        type: String
    },
    deadline: {
        type: Number
    },
    checked: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('list', listSchema);