// GNX and express-graphql imports
const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const {AuditableObjectFields} = require('./extended_types/auditableGraphQLObjectType');

// Project imports
const Salary = require('../models/salary').Salary;
const Employee = require('../models/employee').Employee;
const EmployeeType = require('./employee');


// Validations
const {
  CantSetStartDateLessThanEndDate
} = require('../validators/date.validator');

// Graphql Types
const {
    GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt
} = graphql;

// Project Type
const SalaryType = new GraphQLObjectType({
  name: 'SalaryType',
  description: 'Represent salaries',
  extensions: {
    validations: {
      'CREATE':
      [
        CantSetStartDateLessThanEndDate
      ]
    },
  },
  fields: () => Object.assign(AuditableObjectFields, {
    id: { type: GraphQLID },
    employee: {
      type: EmployeeType,
      extensions: {
        relation: {
          connectionField: "employee_id",
          embedded: false
        }
      },
      resolve(parent, args) {
        return Employee.findById(parent.employee_id);
      }
    },
  salary: { type: GraphQLInt },
  from_date: { type: GraphQLString },
  to_date: { type: GraphQLString }
  })
});

// It's a Collection 
gnx.connect(Salary, SalaryType, 'salary', 'salaries');

// Export module
module.exports = SalaryType;
