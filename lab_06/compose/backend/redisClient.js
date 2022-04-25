const Redis = require("redis");


const dbData = {
  host: process.env.REDIS_HOST || "redis",
  port: process.env.REDIS_PORT || 6379,
}

const client = Redis.createClient({
  url: `redis://@${dbData.host}:${dbData.port}`
})

module.exports = client;