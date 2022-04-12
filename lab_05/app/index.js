const express = require('express')
const app = express()

app.use(express.json())

// const Redis = require('ioredis')
// const redisConnection = { 
//     port: 5000,
//     host: '127.0.0.1'
// }

// const redisClient = new Redis(redisConnection)

const { Client } = require('pg')

const postgresConnection = {
    host: '127.0.0.1',
    port:  5432,
    database:  'postgres',
    user: 'postgres',
    password: 'secret'
};

const postgresClient = new Client(postgresConnection)

// redisClient.on('error', err => {
//     console.error('Error connecting to Redis', err);
//   });
//   redisClient.on('connect', () => {
//       console.log(`Connected to Redis.`)
//       const port = 5000
//       app.listen(port, () => {
//         console.log(`Redis listening at port 5000`);
//       });
//   });

  postgresClient
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    const port =  5432
    app.listen(port, () => {
      console.log(`Postgres listening at port 5432`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));
