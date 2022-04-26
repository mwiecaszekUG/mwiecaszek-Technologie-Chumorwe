const express = require('express');
const router = express.Router()

const Room = require('../models/Room')

router.get('/', async (req, res) => {
    Room.find({}).then(rooms => {
      res.send(rooms);
    }).catch((error) => {
      console.log(error)
      res.sendStatus(404)
    })
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id
    Room.findById(id).then((room) => {
      if(!room) {
        return res.send("Room not found")
      }
      res.send(room)
    }).catch((error) => {
      console.log(error);
    })
});

router.post('/', async (req, res) => {
    Room.create(req.body).then(room => {
      return res.send(req.body)
    }).catch((error) => {
      console.log(error);
      res.sendStatus(404)
    })
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    Room.findByIdAndDelete(id).then(room => {
      if (!room) {
       return res.sendStatus(404)
      }
      return res.send("Deleted")
    }).catch((er) => {
      return res.send(er)
    })
  })

  router.post('/add_player/:id', async (req, res) => {
    const id = req.params.id
    Room.updateOne(
      { _id:id },
      { $push: { players: req.body.login }}
    ).then(riddle => {
      res.send(riddle)
    })
  })

  router.delete('/del_player/:id', async (req, res) => {
    const id = req.params.id
    Room.updateOne(
      { _id: id },
      { name: req.body.name },
      { $pull: { players: req.body.login } }
    ).then(response => {
      res.send(response)
    })
  })

  router.put('/del_riddle/:id', async (req, res) => {
    const id = req.params.id
    Room.updateOne(
      { _id: id },
      { $pop: { riddles: -1 } }
    ).then(response => {
      res.send(response)
    })
  })

  module.exports = router;