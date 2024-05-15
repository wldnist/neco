import Queries from "./queries/index.js";
import Mutations from "./mutations/index.js";

const resolvers = {
  Query: Queries,
  Mutation: Mutations,
};

export default resolvers;
