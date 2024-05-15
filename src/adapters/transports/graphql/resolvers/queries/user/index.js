import getUsersQuery from "./getUsers.js";
import getUserByUUIDQuery from "./getUserByUUID.js";

const UserQueries = {
  ...getUsersQuery,
  ...getUserByUUIDQuery,
};

export default UserQueries;
