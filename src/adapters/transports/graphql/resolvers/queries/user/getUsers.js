import userData from "../../../../../repositories/mocks/user.json" assert { type: "json" };

const getUsersQuery = {
  // getUsers: () => {
  //   return userData;
  // },
  getUsers: async (_, {}, context) => {
    const result = await context.userService.list({
      filter: "",
      status: "",
    });

    return result.users;
  },
};

export default getUsersQuery;
