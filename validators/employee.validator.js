// GNX and express-graphql imports
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

// Project imports
const { Employee } = require('../models/employee');

/* This method checks that the employee 
*  that the employee is over 18 years old
*/
const CheckIfEmployeeIsLegalAge ={
    validate: async function(typeName, originalObject, materializedObject) {
        const currentDate = new Date();
        const birthDate = new Date(materializedObject.birth_date);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const m = currentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            throw new CheckIfEmployeeIsLegalAgeError(typeName);
        }
    }
};

/* Custom Exception Handler
*  called by from CheckIfEmployeeIsLegalAgeError
*  which throws an error message 
*/
class CheckIfEmployeeIsLegalAgeError extends GNXError {
    constructor(typeName) {
      super(typeName,'the employee must be over 18 years old', 'CheckIfEmployeeIsLegalAgeError');
    }
};

// Export module
module.exports ={
    CheckIfEmployeeIsLegalAge
};