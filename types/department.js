// GNX and express-graphql imports
const graphql = require('graphql');
const gnx = require('@simtlix/gnx');

// Project imports
const Department = require('../models/department').Department;

// Validations
const {
  CantRepeatDepartmentName, CantDeleteDepartmentWithChilds
} = require('../validators/department.validator');

// Graphql Types
const {
    GraphQLObjectType, GraphQLString, GraphQLID
} = graphql;

// Project Type
const DepartmentType = new GraphQLObjectType({
  name: 'DepartmentType',
  description: 'Represent departments',
  extensions: {
    validations: {
      'CREATE':
      [
        CantRepeatDepartmentName
      ],
      'DELETE' :
      [
        CantDeleteDepartmentWithChilds,
      ],
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    dept_name: { type: GraphQLString }
  })
});

// It's a Collection 
gnx.connect(Department, DepartmentType, 'department', 'departments');

// Export module
module.exports = DepartmentType;
