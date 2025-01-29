const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const Manager = require("../models/Manager");
const Coder = require("../models/Coder");

// Manager Type
const ManagerType = new GraphQLObjectType({
  name: "Manager",
  fields: () => ({
    _id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Coder Type
const CoderType = new GraphQLObjectType({
  name: "Coder",
  fields: () => ({
    _id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    challenges_completed: { type: GraphQLInt },
    skill_level: { type: GraphQLString },
  }),
});

// Query Definitions
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllManagers: {
      type: new GraphQLList(ManagerType),
      async resolve() {
        return Manager.find();
      },
    },
    getManagerById: {
      type: ManagerType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        return Manager.findById(args.id);
      },
    },
    getAllCoders: {
      type: new GraphQLList(CoderType),
      async resolve() {
        return Coder.find();
      },
    },
    getCoderById: {
      type: CoderType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        return Coder.findById(args.id);
      },
    },
  },
});

// Mutation Definitions (Create Coder & Manager)
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createManager: {
      type: ManagerType,
      args: {
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        const manager = new Manager(args);
        return manager.save();
      },
    },
    createCoder: {
      type: CoderType,
      args: {
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        challenges_completed: { type: GraphQLInt },
        skill_level: { type: GraphQLString },
      },
      async resolve(_, args) {
        const coder = new Coder(args);
        return coder.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
