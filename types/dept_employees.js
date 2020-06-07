// GNX and express-graphql imports
const graphql = require('graphql');
const {AuditableObjectFields} = require('./extended_types/auditableGraphQLObjectType');
const gnx = require('@simtlix/gnx');

// Project imports
const DeptEmployee = require('../models/deptEmployee').DeptEmployee;
const Employee = require('../models/employee').Employee;
const EmployeeType = require('./employee');
const Department = require('../models/department').Department;
const DepartmentType = require('./department');

// Graphql Types
const {
    GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt
} = graphql;

// Project Type
const DeptEmployeeType = new GraphQLObjectType({
    name: 'DeptEmployeeType',
    description: 'Represents department of Employees',
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
      department: {
        type: DepartmentType,
        extensions: {
          relation: {
            connectionField: "department_id",
            embedded: false
          }
        },
        resolve(parent, args) {
          return Department.findById(parent.department_id);
        }
      },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString }
    })
  });

// It's a Collection 
gnx.connect(DeptEmployee, DeptEmployeeType, 'deptEmployee', 'deptsEmployee');

// Export module
module.exports = DeptEmployeeType;
