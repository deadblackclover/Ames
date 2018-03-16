const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')
const federation = require('../libs/federation')

const router = express.Router()

router.post('/', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  if (req.session.authorized) {
    let to = req.body.to
    let message = req.body.message
    if (to.indexOf('@') !== -1) {
      let name = to.substring(0, to.indexOf('@'))
      let host = to.substring(to.indexOf('@') + 1)

      let uid = 'dsnsjhgdsk'

      federation.send(host, uid, name, message)

      // Data structure
      // uid
      // from
      // to
      // message

      db.messages.insert({uid: req.session.uid, from: req.session.username, to: to, message: message}, function(err) {
        logger.save('dbMessages', err)
      })

      res.send(true)
    } else {
      res.send(false)
    }
  } else {
    res.send(false)
  }
})

module.exports = router
