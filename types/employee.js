const graphql = require('graphql');
const Employee = require('../models/employee').Employee;
const GenderTypeEnum = require('./enums/gender.enum');
const {AuditableObjectFields} = require('./extended_types/auditableGraphQLObjectType');

const gnx = require('@simtlix/gnx');

const {
    GraphQLObjectType, GraphQLString, GraphQLID,
    GraphQLInt, GraphQLNonNull
} = graphql;

const EmployeeType = new GraphQLObjectType({
    name: 'EmployeeType',
    description: 'Represent employees',
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

gnx.connect(Employee, EmployeeType, 'employee', 'employees');

module.exports = EmployeeType;