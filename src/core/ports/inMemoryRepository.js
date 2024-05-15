class InMemoryRepositoryAbstract {
  constructor() {
    if (this.constructor == InMemoryRepositoryAbstract) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }

  async get() {
    throw new Error("Method 'get()' must be implemented.");
  }

  async set() {
    throw new Error("Method 'set()' must be implemented.");
  }
}

export default InMemoryRepositoryAbstract;
