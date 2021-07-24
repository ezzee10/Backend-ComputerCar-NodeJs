const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    vtv: {
        type: String,
        default: null,
        trim: true
    },
    fireExtinguisher: {
        type: String,
        default: null,
        trim: true
    },
    battery: {
        type: String,
        default: null,
        trim: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
})

module.exports = mongoose.model('Note', NoteSchema);