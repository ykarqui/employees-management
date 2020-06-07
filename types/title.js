// GNX and express-graphql imports
const graphql = require('graphql');
const {AuditableObjectFields} = require('./extended_types/auditableGraphQLObjectType');
const gnx = require('@simtlix/gnx');

// Project imports
const Title = require('../models/title').Title;
const Employee = require('../models/employee').Employee;
const EmployeeType = require('./employee');

// Graphql Types
const {
    GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt
} = graphql;

// Project Type
const TitleType = new GraphQLObjectType({
    name: 'TitleType',
    description: 'Represents employee titles',
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
    title: { type: GraphQLString },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString }
    })
  });

// It's a Collection 
gnx.connect(Title, TitleType, 'title', 'titles');

// Export module
module.exports = TitleType;
