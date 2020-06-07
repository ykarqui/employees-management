// GNX and express-graphql imports
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

// Project imports
const { Title } = require('../models/title');

/* This method checks that the same employee's title 
*  isn't loaded before
*/
const CheckIfEmployeesTitleIsAlreadyRegistered ={
    validate: async function(typeName, originalObject, materializedObject) {
        const TitleFinded = await Title.findOne({ 'title': materializedObject.title });
       
        if (TitleFinded && TitleFinded.employee === materializedObject.employee) {
            throw new CheckIfEmployeesTitleIsAlreadyRegisteredError(typeName);
        }
    }
};

/* Custom Exception Handler
*  called by from CheckIfEmployeesTitleIsAlreadyRegistered
*  which throws an error message 
*/
class CheckIfEmployeesTitleIsAlreadyRegisteredError extends GNXError {
    constructor(typeName) {
      super(typeName,'Name of department cant be repeated', 'CheckIfEmployeesTitleIsAlreadyRegisteredError');
    }
};

// Export module
module.exports ={
    CheckIfEmployeesTitleIsAlreadyRegistered
};
