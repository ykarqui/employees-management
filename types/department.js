const graphql = require('graphql');
const Department = require('../models/department').Department;

const gnx = require('@simtlix/gnx');

const {
  CantRepeatDepartmentName
} = require('../validators/department.validator');

const {
    GraphQLObjectType, GraphQLString, GraphQLID,
    GraphQLInt, GraphQLList
} = graphql;

const DepartmentType = new GraphQLObjectType({
    name: 'DepartmentType',
    description: 'Represent departments',
    extensions: {
      validations: {
        'CREATE':
        [
          CantRepeatDepartmentName
        ],
        'UPDATE':
        [
          CantRepeatDepartmentName
        ]
      },
    },
    fields: () => ({
      id: { type: GraphQLID },
      dept_name: { type: GraphQLString }
    })
  });

gnx.connect(Department, DepartmentType, 'department', 'departments');

module.exports = DepartmentType;
