const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const {Department} = require('../models/department');

const CantRepeatDepartmentName ={
    validate: async function(typeName, originalObject, materializedObject) {
        const DepartmentFinded =
        await Department.findOne({'dept_name': materializedObject.dept_name});
       
        if (DepartmentFinded && DepartmentFinded._id != materializedObject.id) {
            throw new CantUpdateDepartmentWithNameUsedError(typeName);
        }
        if (DepartmentFinded.dept_name == materializedObject.dept_name && DepartmentFinded._id != materializedObject.id) {
            throw new CantUpdateDepartmentWithNameUsedError(typeName);
        }
    }
};

class CantUpdateDepartmentWithNameUsedError extends GNXError {
    constructor(typeName) {
      super(typeName,'Name of department cant be repeated', 'CantUpdateDepartmentWithNameUsedError');
    }
};

module.exports ={
    CantRepeatDepartmentName
};