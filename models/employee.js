const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    dni: {
        type: Number,
        required: false
    },
    birth_date: {
        type: Date,
        required: false
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    hire_date: {
        type: Date,
        required: false
      }
    
})

const Employee = mongoose.model('Employee', EmployeeSchema);

if (!Employee.collection.collection) {
    Employee.createCollection();
}

module.exports = { Employee, EmployeeSchema };