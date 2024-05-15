const userType = `
  type User {
    id: Int
    uuid: String
    email: String!
    name: String!
    phone: String!
    dob: String!
    status: Int!
    password: String!
    verified: Boolean!
    created_by: String
    updated_by: String
    created_at: String
    updated_at: String
  }
`;

export default userType;
