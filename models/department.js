const mongoose = require("mongoose");
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  dept_name: {
    type: String,
    required: true
  }
});

const Department = mongoose.model("department", DepartmentSchema);

if (!Department.collection.collection) {
  Department.createCollection();
}

module.exports = {Department, DepartmentSchema};