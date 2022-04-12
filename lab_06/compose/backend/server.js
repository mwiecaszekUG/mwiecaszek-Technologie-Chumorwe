'use strict';

const express = require('express');

const app = express();

const redis = express.Router

const PORT = process.env.PGPORT;

const client = require('./redisClient');

app.get('/', async(req, res) => {

    const data = await client.lrange('user-queue', 0, -1)

  return res.send({
    dane: data
  })
});

app.post('/', async (req, res) => {
  
    await client.rpush('user-queue', req.body.person)
 
  res.send("added")
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

client.on('error', err => {
  console.error('Error connecting to Redis', err);
});
client.on('connect', () => {
    console.log(`Connected to Redis.`)
    const port = process.env.PORT || 6379
    app.listen(port, () => {
      console.log(`API server listening at ${process.env.host}:${port}`);
    });
});