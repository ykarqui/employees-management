// GNX and express-graphql imports
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

// Project imports
const { DeptEmployee } = require('../models/deptEmployee');

/* This method checks that the same employee
*  ins't in the same department
*  in the same portion of time
*/
const CantSetTheSameEmplToTheSameDept ={
    validate: async function(typeName, originalObject, materializedObject) {
        const DeptFinded = await DeptEmployee.findOne({ 'employee': materializedObject.employee });
        if (DeptFinded && DeptFinded.department === materializedObject.department) {

            const dateFromA = new Date(materializedObject.from_date);   // received
            const dateFromB = new Date(DeptFinded.from_date);           // finded
            const dateToA = new Date(materializedObject.to_date);   // received
            const dateToB = new Date(DeptFinded.to_date);           // finded
            // Split from_date received and finded
            const yearFromA = dateFromA.getFullYear();
            const yearFromB = dateFromB.getFullYear();
            const monthFromA = dateFromA.getMonth();
            const monthFromB = dateFromB.getMonth();
            // Split to_date received and finded
            const yearToA = dateToA.getFullYear();
            const yearToB = dateToB.getFullYear();
            const monthToA = dateToA.getMonth();
            const monthToB = dateToB.getMonth();

            // FROM_DATE OR TO_DATE couldn't be the same
            if( (yearFromA == yearFromB && monthFromA == monthFromB) || (yearToA == yearToB && monthToA == monthToB) ){
                throw new CantSetTheSameEmployeeToTheSameDeptError(typeName);
            }
        }
    }
};

/* Custom Exception Handler
*  called by from CantSetTheSameEmplToTheSameDept
*  which throws an error message 
*/
class CantSetTheSameEmployeeToTheSameDeptError extends GNXError {
    constructor(typeName) {
      super(typeName,'This employee is already in the same department in the same time', 'CantSetTheSameEmployeeToTheSameDeptError');
    }
};

// Export module
module.exports ={
    CantSetTheSameEmplToTheSameDept
};

