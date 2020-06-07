// GNX and express-graphql imports
const graphql = require('graphql');
const {AuditableObjectFields} = require('./extended_types/auditableGraphQLObjectType');
const gnx = require('@simtlix/gnx');

// Project imports
const Employee = require('../models/employee').Employee;
const GenderTypeEnum = require('./enums/gender.enum');

// Validations
const {
  CheckIfEmployeeIsLegalAge
} = require('../validators/employee.validator');

// Graphql Types
const {
    GraphQLObjectType, GraphQLString, GraphQLID,
    GraphQLInt, GraphQLNonNull
} = graphql;

// Project Type
const EmployeeType = new GraphQLObjectType({
  name: 'EmployeeType',
  description: 'Represent employees',
  extensions: {
    validations: {
      'CREATE':
      [
        CheckIfEmployeeIsLegalAge
      ]
    },
  },
  fields: () => Object.assign(AuditableObjectFields, {
    id: { type: GraphQLID },
    dni: { type: GraphQLInt },
    birth_date: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GenderTypeEnum },
    hire_date: { type: GraphQLString }
  })
});

// It's a Collection 
gnx.connect(Employee, EmployeeType, 'employee', 'employees');

// Export module
module.exports = EmployeeType;