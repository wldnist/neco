import ServiceAbstract from "./service.js";

class UserServiceAbstract extends ServiceAbstract {
  constructor() {
    super();

    if (this.constructor == UserServiceAbstract) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }
}

export default UserServiceAbstract;
