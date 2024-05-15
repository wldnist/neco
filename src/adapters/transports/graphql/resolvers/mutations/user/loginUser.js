import userData from "../../../../../repositories/mocks/user.json" assert { type: "json" };

const loginUserMutation = {
  loginUser: async (_, { input }, context) => {
    const { email, password } = input;
    const result = await context.userService.login({ email, password });
    return result;
  },
};

export default loginUserMutation;
