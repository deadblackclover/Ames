const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')
const federation = require('../libs/federation')

const router = express.Router()

router.post('/', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  if (req.session.authorized) {
    let from = req.session.username
    let to = req.body.to
    let message = req.body.message
    if (to.indexOf('@') !== -1) {
      let host = to.substring(to.indexOf('@') + 1)

      let webfinger = federation.webfinger(host, to)
      webfinger.then(
        result => {
          let uid = result.links[0].properties['http://localhost:3000/users/uid']

          federation.send(host, uid, from, to, message)

          // Data structure
          // uid
          // from
          // to
          // message

          db.messages.insert({uid: req.session.uid, from: from, to: to, message: message}, function(err) {
            logger.save('dbMessages', err)
          })

          res.send(true)
        }
      )
    } else {
      res.send(false)
    }
  } else {
    res.send(false)
  }
})

module.exports = router
