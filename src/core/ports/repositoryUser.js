import RepositoryAbstract from "./repository.js";

class UserRepositoryAbstract extends RepositoryAbstract {
  constructor() {
    super();

    if (this.constructor == UserRepositoryAbstract) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }
}

export default UserRepositoryAbstract;
