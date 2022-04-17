const mongoose = require('mongoose');

const truckSchema = mongoose.Schema({
        _id: { type: String, required: true },
        longitude: { type: String, required: true },
        latitude: { type: String, required: true },
        size: { type: String, required: true },
        date: { type: String, required: true },

    })

;

module.exports = mongoose.model('Trash', truckSchema);
