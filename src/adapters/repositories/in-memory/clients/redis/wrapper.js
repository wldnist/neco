import RedisInMemoryRepositoryAbstract from "../../../../../core/ports/inMemoryRepositoryRedis.js";

class InMemoryRepository extends RedisInMemoryRepositoryAbstract {
  constructor({ inMemoryRepositoryClient }) {
    super();

    this.inMemoryRepositoryClient = inMemoryRepositoryClient;
  }

  async get({ key, dbNumber = 0 }) {
    await this.inMemoryRepositoryClient.select(dbNumber);
    const result = await this.inMemoryRepositoryClient.get(key);

    return result;
  }

  async set({ key, value, dbNumber = 0, expiry = 600 }) {
    await this.inMemoryRepositoryClient.select(dbNumber);
    await this.inMemoryRepositoryClient.set(key, value);
    await this.inMemoryRepositoryClient.expire(key, expiry);
  }

  publish(channelName, message) {
    this.inMemoryRepositoryClient.publish(channelName, message);
  }
}

export default InMemoryRepository;
