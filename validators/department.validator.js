// GNX and express-graphql imports
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

// Project imports
const { Department } = require('../models/department');
const DeptManager = require('../models/deptManager').DeptManager;
const DeptEmployee = require('../models/deptEmployee').DeptEmployee;

/* This method checks that the department name 
*  isn't repeated in the database when it's created.
*/
const CantRepeatDepartmentName ={
    validate: async function(typeName, originalObject, materializedObject) {
        const DepartmentFinded = await Department.findOne({ 'dept_name': materializedObject.dept_name });
       
        if (DepartmentFinded && DepartmentFinded._id != materializedObject.id) {
            throw new CantUpdateDepartmentWithNameUsedError(typeName);
        }
    }
};

/* This method checks that the department 
*  doesn't have any childs in the others Collection
*/
const CantDeleteDepartmentWithChilds = {
    validate: async function(typeName, originalObject, materializedObject) {
        
        const DeptFinded = await DeptManager.findOne({'department_id':originalObject});
        const DeptEmplFinded = await DeptEmployee.findOne({'department_id':originalObject});

        if (DeptFinded) {
            throw new CantDeleteDepartmentWithChildsError(typeName, 'The Department must not have dept_manager child');
        }

        if (DeptEmplFinded) {
            throw new CantDeleteDepartmentWithChildsError(typeName, 'The Department must not have dept_empl child');
        }
    }
};

/* Custom Exception Handler
*  called by from CantRepeatDepartmentName
*  which throws an error message 
*/
class CantUpdateDepartmentWithNameUsedError extends GNXError {
    constructor(typeName) {
      super(typeName,'Name of department cant be repeated', 'CantUpdateDepartmentWithNameUsedError');
    }
};

/* Custom Exception Handler
*  called by from CantDeleteDepartmentWithChilds
*  which throws an error message 
*/
class CantDeleteDepartmentWithChildsError extends GNXError {
    constructor(typeName, msg) {
      super(typeName, msg, 'CantDeleteDepartmentWithChildsError');
    }
};

// Export module
module.exports ={
    CantRepeatDepartmentName, 
    CantDeleteDepartmentWithChilds
};