const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
        employeeName: { type: String, required: true },
        employeeEmail: { type: String, required: true },
        employeeJob: { type: String, required: true },
        employeeSalary: { type: Number, required: true },
        employeeCIN: { type: String, required: true },
        date: { type: String, required: true },
        // userId: { type: String, required: true },

    })

;

module.exports = mongoose.model('Employee', employeeSchema);
