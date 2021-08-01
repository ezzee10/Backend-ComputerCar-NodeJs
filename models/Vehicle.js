const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
    kilometresTotal: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    kilometresPartial: {
        type: Number,
        trim: true,
        default: 0,
    },
    kmsMissingUpdateRotationWheels : {
        type: Number, 
        trim: true,
        default: 100000
    },
    kmsMissingUpdateTransmission: {
        type: Number,
        trim: true,
        default: 150000
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
})

module.exports = mongoose.model('Vehicle', VehicleSchema);