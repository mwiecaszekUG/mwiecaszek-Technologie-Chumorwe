const Redis = require("ioredis");

const dbConnData = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || 'redis',
};
const client = new Redis(dbConnData);

module.exports = client;