class ServiceAbstract {
  constructor() {
    if (this.constructor == ServiceAbstract) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }

  async list() {
    throw new Error("Method 'list()' must be implemented.");
  }

  async get() {
    throw new Error("Method 'get()' must be implemented.");
  }

  async create() {
    throw new Error("Method 'create()' must be implemented.");
  }

  async update() {
    throw new Error("Method 'update()' must be implemented.");
  }

  async delete() {
    throw new Error("Method 'delete()' must be implemented.");
  }
}

export default ServiceAbstract;
