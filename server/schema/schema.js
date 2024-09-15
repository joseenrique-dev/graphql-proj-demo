const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
 } = graphql;

 //user data
const users = [
  { id: '23', name: 'Bond', age: 35, profession: 'Spy' },
  { id: '47', name: 'Ethan', age: 30, profession: 'Programmer' }
];

//hobby data
const hobbies = [
  { id: '1', title: 'Programming', description: 'Using computers to make the world a better place' },
  { id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donuts' },
  { id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water' }
];

//post data
const posts = [
  { id: '1', comment: 'Building a Mind'},
  { id: '2', comment: 'Using GraphQL'},
  { id: '3', comment: 'Why do we use Graphql'},
  { id: '4', comment: 'Implementing GraphQL'}
];

//create types
const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString }
  }
});


const HobbyType = new graphql.GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby description',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    // userId: { type: graphql.GraphQLString }
  })
});

const PostType = new graphql.GraphQLObjectType({
  name: 'Post',
  description: 'Post description',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    // userId: { type: graphql.GraphQLString }
  })
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
        return _.find(users, { id: args.id });
      }
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // resolve with data
        return _.find(hobbies, { id: args.id });
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // resolve with data
        return _.find(posts, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});