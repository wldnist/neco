class RepositoryAbstract {
  constructor() {
    if (this.constructor == RepositoryAbstract) {
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

  async upsert() {
    throw new Error("Method 'upsert()' must be implemented.");
  }
}

export default RepositoryAbstract;
