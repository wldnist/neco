import { Redis } from "ioredis";

class RedisConsumer {
  constructor({ mysqlUserActivitiesRepository, redisRepository }) {
    this.channelName = process.env.REDIS_LOG_CHANNEL_NAME;
    this.userActivityRepository = mysqlUserActivitiesRepository;
    this.consumer = redisRepository;
    this.producer = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_AUTH,
    });
  }

  async consume() {
    this.consumer.subscribe(this.channelName);
    this.consumer.consume(async (channel, message) => {
      await this.handleMessage(channel, message);
    });
  }

  handleMessage = async (channel, message) => {
    const isProcessed = await this.processLogMessage(channel, message);
    if (!isProcessed) {
      this.producer.publish(this.channelName, message);
    }
  };

  processLogMessage = async (channel, message) => {
    if (channel === this.channelName) {
      try {
        const userActivityLog = JSON.parse(message);
        if (userActivityLog?.user_id && userActivityLog?.activity) {
          await this.userActivityRepository.upsert(userActivityLog);
          return true;
        }
      } catch (error) {
        console.error("Error processing log message:", error);
      }
    }

    return false;
  };
}

export default RedisConsumer;
