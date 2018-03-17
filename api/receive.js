const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')

const router = express.Router()

router.post('/users/:uid', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  let uid = req.params.uid
  let from = req.body.from
  let to = req.body.to
  let message = req.body.message
  if (uid !== '' && to !== '' && message !== '') {
    db.messages.insert({uid: uid, from: from, to: to, message: message}, function(err) {
      logger.save('dbMessages', err)
    })
  } else {
    res.send(false)
  }
})

module.exports = router
