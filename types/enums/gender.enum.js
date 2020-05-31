const graphql = require('graphql');

const {
  GraphQLEnumType,
} = graphql;

const GenderTypeEnum = new GraphQLEnumType({
  name: 'GenderTypeEnum',
  values: {
    M: {
      value: 'Male',
    },
    F: {
      value: 'Female',
    },
    A: {
      value: 'Agender',
    },
    B: {
      value: 'Bigender',
    },
    N: {
      value: 'Non-binary',
    },
    P: {
        value: 'Pangender',
    },
    T: {
      value: 'Trans',
    },
    O: {
      value: 'Other',
    }
  },
});

module.exports = GenderTypeEnum;