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
    rotation: {
        type: Number,
        default: 100000,
        trim: true
    },
    transmission: {
        type: Number,
        default: 15000,
        trim: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
})

module.exports = mongoose.model('Note', NoteSchema);