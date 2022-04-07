const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    type: {type: String, enum: ['Point'], required: true},
    coordinates: {type: [Number],required: true}
});
module.exports = mongoose.model('Point', pointSchema);
