const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeFields = {
    dni: Number,
    birth_date: String,
    first_name: String,
    last_name: String,
    gender: String,
    hire_date: String
};

const employeeSchema = new Schema({ employeeFields });

const Employee = mongoose.model('Employee', employeeSchema, 'epmloyee');

if (!Employee.collection.collection) {
    Employee.createCollection();
}

module.exports = { Employee, employeeFields };