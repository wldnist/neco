import userData from "../../../../../repositories/mocks/user.json" assert { type: "json" };

const getUserByUUIDQuery = {
  getUserByUUID: (_, { uuid }) => {
    if (!uuid) {
      throw Error("uuid is required");
    }

    return userData.find((user) => user.uuid === uuid);
  },
};

export default getUserByUUIDQuery;
