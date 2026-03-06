import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("✅ Redis Connected");
  } catch (err) {
    console.error("Redis connection error:", err);
  }
};