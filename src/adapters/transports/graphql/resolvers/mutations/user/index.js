import createUserMutation from "./createUser.js";
import loginUserMutation from "./loginUser.js";
import refreshTokenUserMutation from "./refreshTokenUser.js";

export const UserMutations = {
  ...createUserMutation,
  ...loginUserMutation,
  ...refreshTokenUserMutation,
};

export default UserMutations;
