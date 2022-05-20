const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientType: { type: String, required: true },
    clientCIN: { type: String, required: true },
    client_trushSize: { type: String, required: true },
    client_trash_id: { type: String, required: true },

    })

;

module.exports = mongoose.model('Client', clientSchema);
