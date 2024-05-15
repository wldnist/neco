const createUserInputType = `
  input CreateUserInput {
    email: String!
    name: String!
    phone: String!
    dob: String!
    status: Boolean!
    password: String!
  }
`;

export default createUserInputType;
