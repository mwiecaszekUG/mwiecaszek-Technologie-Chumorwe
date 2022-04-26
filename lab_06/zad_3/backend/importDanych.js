const express = require('express');
const router = express.Router()
const data = require('./riddles.json')
const app = express();

const Riddle = require('./models/Riddles')

const dbConnData = {
    host: '127.0.0.1',
    port:  27017,
    database: 'local'
};

const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(response => {
    console.log(`Starting to insert data`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`On port ${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

  

  data.map((riddle) => {
      riddle._id = riddle.id
      Riddle.create(riddle).then(riddle => {
          // 
      }).catch((er) => {
          console.log(er)
      })
  })
