const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')

const router = express.Router()

router.post('/', (req, res) => {
  if (req.session.authorized) {
    let username = req.session.username
    db.users.find({username:username}, function(err, docs) {
      if (err) { logger.save('dbUsers', err) }
      if (docs[0] !== undefined) {
        res.send({
          uid: docs[0].uid,
          username: docs[0].username,
          fname: docs[0].fname,
          lname: docs[0].lname,
          photo: docs[0].photo
        })
      }
    })
  }
})

module.exports = router
