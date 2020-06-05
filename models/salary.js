const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaryFields = {
    salary: Number,
    from_date: String,
    to_date: String,
    empID: mongoose.Schema.Types.ObjectId
};

const salarySchema = new Schema({ salaryFields });

const Salary = mongoose.model('Salary', salarySchema, 'salary');

if (!Salary.collection.collection) {
    Salary.createCollection();
}

module.exports = { Salary, salaryFields };