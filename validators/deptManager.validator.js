// GNX and express-graphql imports
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

// Project imports
const { DeptManager } = require('../models/deptManager');

/* This method checks that the same Manager
*  ins't in the same department
*  in the same portion of time
*/
const CantSetTheSameManagerToTheSameDept ={
    validate: async function(typeName, originalObject, materializedObject) {
        const DeptFinded = await DeptManager.findOne({ 'employee': materializedObject.employee });
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
                throw new CantSetTheSameManagerToTheSameDeptError(typeName);
            } 
        }
    }
};

/* Custom Exception Handler
*  called by from CantSetTheSameManagerToTheSameDept
*  which throws an error message 
*/
class CantSetTheSameManagerToTheSameDeptError extends GNXError {
    constructor(typeName) {
      super(typeName,'This manager is already in the same department in the same time', 'CantSetTheSameManagerToTheSameDeptError');
    }
};

// Export module
module.exports ={
    CantSetTheSameManagerToTheSameDept
};
