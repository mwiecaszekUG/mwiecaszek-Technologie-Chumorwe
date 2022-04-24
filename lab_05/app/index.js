const express = require('express')
const app = express()
const Redis = require('redis')

// komendy z dockera
// docker run -d --name net_postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=postgres -e POSTGRES_DB=nwd -d -p 5432:5432 postgres
// docker network connect post_redis net_postgres
// docker run -d --name net_redis -d -p 6379:6379 redis
// docker network connect post_redis net_redis

const redisConnection = { 
    port: 8080,
    host: 'localhost'
}

const redisClient = Redis.createClient(redisConnection)

const { Client } = require('pg')

const postgresConnection = {
    host: 'localhost',
    port:  5432,
    database:  'nwd',
    user: 'postgres',
    password: 'secret'
};

const postgresClient = new Client(postgresConnection)


  postgresClient
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    postgresClient.query(`Create table if not exists results(number1 int, number2 int, result int)`)
  })
  .catch(err => console.error('Connection error', err.stack));

  try { redisClient.connect(); } catch (err) {
    console.log(err.message);
  }

  redisClient.on('error', err => {
    console.error('Error connecting to Redis', err);
  });
  redisClient.on('connect', () => {
      redisClient.flushAll()
      console.log(`Connected to Redis.`)
  });

  const port =  5000
      app.listen(port, () => {
      console.log(`App listening at port ${port}`);
    });


    const findGCD = (num1, num2) => {
      let a = Math.abs(num1);
      let b = Math.abs(num2);
      while (a && b && a !== b) {
         if(a > b){
            [a, b] = [a - b, b];
         }else{
            [a, b] = [a, b - a];
         };
      };
      return a || b;
   };
  
app.get('/nwd', async (req, res) => {

  previous = await redisClient.keys("*")
  if (previous.includes(`${req.query.v1}, ${req.query.v2}`)) {
    const z_cache = await redisClient.get(`${req.query.v1}, ${req.query.v2}`)
    res.send({z_cache})
  } else {
    const policzone = findGCD(req.query.v1, req.query.v2)

    redisClient.set(`${req.query.v1}, ${req.query.v2}`, `${policzone}`)

    postgresClient.query(`INSERT INTO results(number1, number2, result)
    VALUES (${req.query.v1}, ${req.query.v2}, ${policzone})`)
    res.send({policzone})
    
  }
  
})

app.get('/all', (req, res) => {
  try{ postgresClient.query(`Select * from results`, (err, res2) => {
    if(!err) {
      const wszystkie = res2.rows.map((row) => {
        return row.result
      })
      res.send({wszystkie})
    } else {
      res.send(err.message)
    }
  })} catch(err) {
    res.send(err)
  }
})


app.post('/test', async (req, res) => {
  postgresClient.query(`INSERT INTO results(number1, number2, result)
    VALUES (${req.query.v1}, ${req.query.v2}, ${req.query.v3})`)
    res.send('added')
})





