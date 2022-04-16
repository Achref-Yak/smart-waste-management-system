const mongoose = require('mongoose');

const truckSchema = mongoose.Schema({
        RegNumber: { type: String, required: true },
        TruckBrand: { type: String, required: true },
        TankVolume: { type: String, required: true },
        FirstDriver: { type: Number, required: true },
        SecondDriver: { type: String, required: true },
        RecruitmentDate: { type: String, required: true },
       
    })

;

module.exports = mongoose.model('Truck', truckSchema);
