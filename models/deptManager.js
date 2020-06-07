const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeptManagerSchema = new Schema({
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

const DeptManager = mongoose.model('DeptManager', DeptManagerSchema);

if (!DeptManager.collection.collection) {
    DeptManager.createCollection();
}

module.exports = { DeptManager, DeptManagerSchema };