import InMemoryRepositoryAbstract from "./inMemoryRepository.js";

class RedisInMemoryRepositoryAbstract extends InMemoryRepositoryAbstract {
  constructor() {
    super();

    if (this.constructor == RedisInMemoryRepositoryAbstract) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }

  consume() {
    throw new Error("Method 'consume()' must be implemented.");
  }

  publish() {
    throw new Error("Method 'publish()' must be implemented.");
  }

  subscribe() {
    throw new Error("Method 'subscribe()' must be implemented.");
  }

  unsubscribe() {
    throw new Error("Method 'unsubscribe()' must be implemented.");
  }
}

export default RedisInMemoryRepositoryAbstract;
