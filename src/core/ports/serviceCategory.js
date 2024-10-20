import ServiceAbstract from "./service.js";

class CategoryServiceAbstract extends ServiceAbstract {
  constructor() {
    super();

    if (this.constructor == CategoryServiceAbstract) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }
}

export default CategoryServiceAbstract;
