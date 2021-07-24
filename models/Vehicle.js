const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
    kilometresTotal: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
})

module.exports = mongoose.model('Vehicle', VehicleSchema);