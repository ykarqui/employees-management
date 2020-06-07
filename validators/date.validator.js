// GNX and express-graphql imports
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

/* This method checks that from_date and to_date are valid dates
*  to_date > from_date
*/
const CantSetStartDateLessThanEndDate ={
    validate: async function(typeName, originalObject, materializedObject) {
        const fromDate = new Date(materializedObject.from_date);
        const toDate = new Date(materializedObject.to_date);

        let result = toDate - fromDate;
        
        if (toDate <= fromDate) {
            throw new CantSetStartDateLessThanEndDateError(typeName);
        }
    }
};

/* Custom Exception Handler
*  called by from CantSetStartDateLessThanEndDate
*  which throws an error message 
*/
class CantSetStartDateLessThanEndDateError extends GNXError {
    constructor(typeName) {
      super(typeName,'the start date must be less than the end date', 'CantSetStartDateLessThanEndDateError');
    }
};

// Export module
module.exports ={
    CantSetStartDateLessThanEndDate
};