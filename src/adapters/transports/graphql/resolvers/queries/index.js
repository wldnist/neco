import DummyQueries from "./dummy/index.js";
import UserQueries from "./user/index.js";

const Queries = {
  ...DummyQueries,
  ...UserQueries,
};

export default Queries;
