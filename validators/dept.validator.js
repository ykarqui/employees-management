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

        const dateFromA = new Date(materializedObject.from_date);   // received
        const dateFromB = new Date(DeptFinded.from_date);           // finded
        // Split from_date received and finded
        const yearFromA = dateFromA.getFullYear();
        const yearFromB = dateFromB.getFullYear();
        const monthFromA = dateFromA.getMonth();
        const monthFromB = dateFromB.getMonth();
        // Split to_date received and finded
        const yearToA = dateFromA.getFullYear();
        const yearToB = dateFromB.getFullYear();
        const monthToA = dateFromA.getMonth();
        const monthToB = dateFromB.getMonth();

        if (DeptFinded && DeptFinded.department === materializedObject.department ) {
            if( (yearFromA == yearFromB && monthFromA == monthFromB) || (yearToA == yearToB && monthToA == monthToB) ){
                throw new CantSetTheSameEmplToTheSameDeptError(typeName);
            }
        }else {
            console.log("DeptFinded" + DeptFinded);
            console.log("Materialized obj" + materializedObject);
        }
    }
};

/* Custom Exception Handler
*  called by from CantSetTheSameEmplToTheSameDept
*  which throws an error message 
*/
class CantSetTheSameEmplToTheSameDeptError extends GNXError {
    constructor(typeName) {
      super(typeName,'This employee is already in the same department in the same time', 'CantSetTheSameEmplToTheSameDeptError');
    }
};

// Export module
module.exports ={
    CantSetTheSameEmplToTheSameDept
};
