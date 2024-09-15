const graphql = require('graphql');

const { 
  GraphQLObjectType,
  GraphQLString,
  // GraphQLID,
  GraphQLInt,
  GraphQLSchema
 } = graphql;

//create types
const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt }
  }
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // resolve with data
        // let user = {
        //   id: '1',
        //   name: 'Bond',
        //   age: 35
        // };
        // return user;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});