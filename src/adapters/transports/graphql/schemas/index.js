import gql from "graphql-tag";
import Types from "./types/index.js";
import Queries from "./queries/index.js";
import Mutations from "./mutations/index.js";

const typeDefs = gql`
  ${Types}
  ${Queries}
  ${Mutations}
`;

export default typeDefs;
