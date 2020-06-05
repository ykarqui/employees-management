const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptManagerFields = {
    empID: mongoose.Schema.Types.ObjectId,
    deptID: mongoose.Schema.Types.ObjectId,
    from_date: String,
    to_date: String
};

const deptManagerSchema = new Schema({ deptManagerFields });

const DeptManager = mongoose.model('DeptManager', deptManagerSchema, 'deptManager');

if (!DeptManager.collection.collection) {
    DeptManager.createCollection();
}

module.exports = { DeptManager, deptManagerFields };