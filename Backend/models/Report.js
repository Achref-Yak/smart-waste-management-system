const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
        Name: { type: String, required: true },
        Email: { type: String, required: true },      
        Subject: { type: String, required: true },
        Content: { type: String, required: true },
        Location: { type: String, required: true },
    })

;

module.exports = mongoose.model('Report', reportSchema);