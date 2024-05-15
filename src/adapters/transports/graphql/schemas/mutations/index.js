import UserMutations from "./user/index.js";

const Mutations = `
  type Mutation {
    ${UserMutations}
  }
`;

export default Mutations;
