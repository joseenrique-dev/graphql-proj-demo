const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
 } = graphql;

 //user data
const users = [
  { id: '1', name: 'Bond', age: 35, profession: 'Spy' },
  { id: '2', name: 'Ethan', age: 30, profession: 'Programmer' }
];

//hobby data
const hobbiesData = [
  { id: '1', title: 'Programming', description: 'Using computers to make the world a better place', userId: '1' },
  { id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donuts', userId: '1' },
  { id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '2' },
];

//post data
const postsData = [
  { id: '1', comment: 'Building a Mind', userId: '1' },
  { id: '2', comment: 'Using GraphQL', userId: '1' },
  { id: '3', comment: 'Why do we use Graphql', userId: '2' },
  { id: '4', comment: 'Implementing GraphQL', userId: '2' },
];

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby description',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(users, { id: parent.userId });
      }
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post description',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(users, { id: parent.userId });
      }
    }
  })
});

//create types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });  
      }
    }
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
        return _.find(users, { id: args.id });
      }
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // resolve with data
        return _.find(hobbiesData, { id: args.id });
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // resolve with data
        return _.find(postsData, { id: args.id });
      }
    }
  }
});

//Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString }
      },
      resolve(parent, args) {
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession
        };
        return user;
      }
    },
    createPost: {
      type: PostType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let post = {
          comment: args.comment,
          userId: args.userId
        };
        return post;
      }
    },
    createHobby: {
      type: HobbyType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let hobby = {
          title: args.title,
          description: args.description,
          userId: args.userId
        };
        return hobby;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});