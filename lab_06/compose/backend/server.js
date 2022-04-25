'use strict';

const express = require('express');

const app = express();

const redis = express.Router

const PORT = process.env.PORT

const client = require('./redisClient');

const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', async(req, res) => {

    const data = await client.lRange('user-queue', 0, -1)

  return res.send({
    dane: data
  })
});

app.post('/', async (req, res) => {
  
    await client.rPush('user-queue', req.body.person)
 
  res.send("added")
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


try { client.connect(); } catch (err) {
  console.log(err.message);
}

client.on('error', err => {
  console.error('Error connecting to Redis', err);
});
client.on('connect', () => {
    console.log(`Connected to Redis.`)
    const port = process.env.REDIS_PORT || 6379
    app.listen(port, () => {
      console.log(`API server listening at ${process.env.REDIS_HOST}:${port}`);
    });
});