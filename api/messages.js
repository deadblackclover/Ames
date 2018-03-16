const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')

const router = express.Router()

router.post('/', (req, res) => {
  if (req.session.authorized) {
    let to = req.body.to
    db.messages.find({to: to}, function(err, docs) {
      if (err) { logger.save('dbMessages', err) }
      if (docs[0] !== undefined) {
        res.send(true)
      } else {
        res.send(false)
      }
    })
  }
})

module.exports = router
