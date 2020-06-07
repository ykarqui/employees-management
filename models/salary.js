const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    salary: { 
        type: Number,
        required: true
    },
    from_date: { 
        type: Date,
        required: false
    },
    to_date: { 
        type: Date,
        required: false
    },
    employee_id: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }  
})


const Salary = mongoose.model('Salary', SalarySchema);

if (!Salary.collection.collection) {
    Salary.createCollection();
}

module.exports = { Salary, SalarySchema };