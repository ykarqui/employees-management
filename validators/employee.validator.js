// GNX and express-graphql imports
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

// Project imports
const { Employee } = require('../models/employee');
const Salary = require('../models/salary').Salary;
const Title = require('../models/title').Title;
const DeptManager = require('../models/deptManager').DeptManager;
const DeptEmployee = require('../models/deptEmployee').DeptEmployee;

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

/* This method checks that the employee 
*  doesn't have any childs in the others Collection
*/
const CantDeleteEmployeeWithChilds = {
    validate: async function(typeName, originalObject, materializedObject) {
        
        const SalaryFinded = await Salary.findOne({'employee_id': originalObject});
        const TitleFinded = await Title.findOne({'employee_id': originalObject});
        const DeptFinded = await DeptManager.findOne({'employee_id':originalObject});
        const DeptEmplFinded = await DeptEmployee.findOne({'employee_id':originalObject});

        if (SalaryFinded) {
            throw new CantDeleteEmployeeWithChildsError(typeName, 'The employee must not have salary');
        }

        if (TitleFinded) {
            throw new CantDeleteEmployeeWithChildsError(typeName, 'The employee must not have title');
        }

        if (DeptFinded) {
            throw new CantDeleteEmployeeWithChildsError(typeName, 'The employee must not have deptManager');
        }

        if (DeptEmplFinded) {
            throw new CantDeleteEmployeeWithChildsError(typeName, 'The employee must not have deptEmployee');
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

/* Custom Exception Handler
*  called by from CantDeleteEmployeeWithChilds
*  which throws an error message 
*/
class CantDeleteEmployeeWithChildsError extends GNXError {
    constructor(typeName, msg) {
      super(typeName, msg, 'CantDeleteEmployeeWithChildsError');
    }
};

// Export module
module.exports ={
    CheckIfEmployeeIsLegalAge, 
    CantDeleteEmployeeWithChilds
};