const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeptEmployeeSchema = new Schema({
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
    },
    department_id: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const DeptEmployee = mongoose.model('DeptEmployee', DeptEmployeeSchema);

if (!DeptEmployee.collection.collection) {
    DeptEmployee.createCollection();
}

module.exports = { DeptEmployee, DeptEmployeeSchema };