const graphql = require('graphql');
const Salary = require('../models/salary').Salary;
const Employee = require('../models/employee').Employee;
const EmployeeType = require('./employee');
const {AuditableObjectFields} = require('./extended_types/auditableGraphQLObjectType');

const gnx = require('@simtlix/gnx');

const {
    GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt
} = graphql;

const SalaryType = new GraphQLObjectType({
    name: 'SalaryType',
    description: 'Represent salaries',
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

gnx.connect(Salary, SalaryType, 'salary', 'salaries');


module.exports = SalaryType;
