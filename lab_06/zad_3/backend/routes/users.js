const express = require('express');
const router = express.Router()

const User = require('../models/User')

router.get('/', async (req, res) => {
    User.find({}).then(users => {
      res.send(users);
    }).catch((error) => {
      console.log(error)
      res.sendStatus(404)
    })
  });

 
  router.get('/:id', async (req, res) => {
    const id = req.params.id
    User.findById(id).then((User) => {
      if(!User) {
        return res.send("User not found")
      }
      res.send(User)
    }).catch((error) => {
      console.log(error);
    })
});



  router.post('/', async (req, res) => {
    User.create(req.body).then(User => {
      return res.send(req.body)
    }).catch((error) => {
      console.log(error);
      res.sendStatus(404)
    })
  });

  router.put('/op/:id', async (req, res) => {
    const id = req.params.id
    User.updateOne(
      { _id: id },
      { role: "admin" }
    ).then(response => {
      res.send(response)
    })
  })

  router.put('/:id/add_win', async (req, res) => {
    const id = req.params.id
    let user = {}
    await User.findById(id).then(us => {
        user = us
    })
    user.wins = user.wins + 1
    User.findByIdAndUpdate(id, user, {new: true}).then(user => {
        if (!user) {
            res.sendStatus(404)
        } else {
            res.send("added a win")
        }
    }).catch(error => {
        console.log(error);
    })
  })

  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    User.findOneAndReplace({_id: id}, req.body, {new: true}).then(user => {
      if (!user) {
        res.sendStatus(404);
        return;
      }
      res.send(user);
    }).catch(handleEx(res));
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id).then(User => {
      if (!User) {
       return res.sendStatus(404)
      }
      return res.send("Deleted")
    }).catch((er) => {
      return res.send(er)
    })
  })


  module.exports = router;