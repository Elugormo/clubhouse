import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redis_client = redis.createClient(6379, process.env.REDIS_HOST);

redis_client.on("connect", () => {
  console.log("Redis client connected");
});
