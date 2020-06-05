const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptEmployeeFields = {
    empID: mongoose.Schema.Types.ObjectId,
    deptID: mongoose.Schema.Types.ObjectId,
    from_date: String,
    to_date: String
};

const deptEmployeeSchema = new Schema({ deptEmployeeFields });

const DeptEmployee = mongoose.model('DeptEmployee', deptEmployeeSchema, 'deptEmployee');

if (!DeptEmployee.collection.collection) {
    DeptEmployee.createCollection();
}

module.exports = { DeptEmployee, deptEmployeeFields };