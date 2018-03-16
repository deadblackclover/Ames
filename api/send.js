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

      let webfinger = federation.webfinger(host, to)
      webfinger.then(
        result => {
          let uid = result.links[0].properties['http://localhost:3000/users/uid']
          let oKey = result.links[1].properties['http://localhost:3000/users/open-key']
          console.log(uid)
          console.log(oKey)

          federation.send(host, uid, name, message, oKey)

          // Data structure
          // uid
          // from
          // to
          // message

          db.messages.insert({uid: req.session.uid, from: req.session.username, to: to, message: message}, function(err) {
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
