const express = require('express');
const router = express.Router()

const Message = require('../models/Message')

router.get('/', async (req, res) => {
    Message.find({}).then(Messages => {
      res.send(Messages);
    }).catch((error) => {
      console.log(error)
      res.sendStatus(404)
    })
  });

 
  router.get('/:id', async (req, res) => {
    const id = req.params.id
    Message.findById(id).then((Message) => {
      if(!Message) {
        return res.send("Message not found")
      }
      res.send(Message)
    }).catch((error) => {
      console.log(error);
    })
});



  router.post('/', async (req, res) => {
    Message.create(req.body).then(Message => {
      return res.send(req.body)
    }).catch((error) => {
      console.log(error);
      res.sendStatus(404)
    })
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    Message.findByIdAndDelete(id).then(Message => {
      if (!Message) {
       return res.sendStatus(404)
      }
      return res.send("Deleted")
    }).catch((er) => {
      return res.send(er)
    })
  })


  module.exports = router;