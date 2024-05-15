import RestAbstract from "./rest.js";

class DummyRestAbstract extends RestAbstract {
  constructor() {
    super();

    if (this.constructor == DummyRestAbstract) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }
}

export default DummyRestAbstract;
