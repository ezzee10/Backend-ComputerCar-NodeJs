const mongoose = require('mongoose');

const TravelSchema = mongoose.Schema({
    kilometresTravel: {
        type: Number,
        required: true,
        trim: true
    },
    originPlace: {
        type: String,
        required: true,
        trim: true
    },
    destinationPlace: {
        type: String,
        required: true,
        trim: true
    },
    dateOriginPlace: {
        type: Date,
        required: true,
        trim: true
    },
    dateDestinationPlace: {
        type: Date,
        required: true,
        trim: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
})

module.exports = mongoose.model('Travel', TravelSchema);