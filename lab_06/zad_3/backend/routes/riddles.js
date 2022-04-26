const express = require('express');
const router = express.Router()

const Riddle = require('../models/Riddles')

router.get('/', async (req, res) => {
    Riddle.find({}).then(riddles => {
      res.send(riddles);
    }).catch((error) => {
      console.log(error)
      res.sendStatus(404)
    })
  });

 
  router.get('/:id', async (req, res) => {
    const id = req.params.id
    Riddle.findById(id).then((Riddle) => {
      if(!Riddle) {
        return res.send("Riddle not found")
      }
      res.send(Riddle)
    }).catch((error) => {
      console.log(error);
    })
});



  router.post('/', async (req, res) => {
    Riddle.create(req.body).then(Riddle => {
      return res.send(req.body)
    }).catch((error) => {
      console.log(error);
      res.sendStatus(404)
    })
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    Riddle.findByIdAndDelete(id).then(Riddle => {
      if (!Riddle) {
       return res.sendStatus(404)
      }
      return res.send("Deleted")
    }).catch((er) => {
      return res.send(er)
    })
  })

  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    Riddle.findOneAndReplace({_id: id}, req.body, {new: true}).then(riddle => {
      if (!riddle) {
        res.sendStatus(404);
        return;
      }
      res.send(riddle);
    })
  });

  router.get('/comments/:id', async (req, res) => {
    const id = req.params.id
    Riddle.findById(id).then((Riddle) => {
      if(!Riddle.comments) {
        return res.send("No comments avaliable")
      }
      res.send(Riddle.comments)
    }).catch((error) => {
      console.log(error);
    })
  })

  router.post('/comments/:id', async (req, res) => {
    const id = req.params.id
    Riddle.updateOne(
      { _id:id },
      { $push: { comments: req.body.comment }}
    ).then(riddle => {
      res.send(riddle)
    })
  })

  router.delete('/comments/:id', async (req, res) => {
    const id = req.params.id
    Riddle.updateOne(
      { _id: id },
      { $pull: { comments: req.body.comment } }
    ).then(response => {
      res.send(response)
    })
  })

  router.put('/comments/:id', async (req, res) => {
    const id = req.params.id
    await Riddle.updateOne(
      { _id: id },
      { $pull: { comments: req.body.old } }
    )
    Riddle.updateOne(
      { _id:id },
      { $push: { comments: req.body.new }}
    ).then(response =>
      res.send(response))
  })

  module.exports = router;