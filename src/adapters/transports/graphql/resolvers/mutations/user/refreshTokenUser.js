import userData from "../../../../../repositories/mocks/user.json" assert { type: "json" };

const refreshTokenUserMutation = {
  refreshTokenUser: (_, { input }) => {
    return userData.find((user) => user.id === 1);
  },
};

export default refreshTokenUserMutation;
