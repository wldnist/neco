import userType from "./user.js";
import createUserInputType from "./createUserInput.js";
import loginUserInfoType from "./loginUserInfo.js";
import loginUserInputType from "./loginUserInput.js";
import refreshTokenUserInputType from "./refreshTokenUserInput.js";

const UserTypes = `
  ${userType}
  ${createUserInputType}
  ${loginUserInfoType}
  ${loginUserInputType}
  ${refreshTokenUserInputType}
`;

export default UserTypes;
