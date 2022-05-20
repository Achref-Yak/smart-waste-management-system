const mongoose = require('mongoose');

const truckSchema = mongoose.Schema({
        regNumber: { type: String, required: true },
        truckBrand: { type: String, required: true },
        tankVolume: { type: String, required: true },
        firstDriver: { type: String, required: true },
        secondDriver: { type: String, required: true },
        date: { type: String, required: true },
       
    })

;

module.exports = mongoose.model('Truck', truckSchema);
