// GNX and express-graphql imports
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

// Project imports
const { Department } = require('../models/department');

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

/* Custom Exception Handler
*  called by from CantRepeatDepartmentName
*  which throws an error message 
*/
class CantUpdateDepartmentWithNameUsedError extends GNXError {
    constructor(typeName) {
      super(typeName,'Name of department cant be repeated', 'CantUpdateDepartmentWithNameUsedError');
    }
};

// Export module
module.exports ={
    CantRepeatDepartmentName
};