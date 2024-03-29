/*   Copyright (c) 2018, Ames Project. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')
const federation = require('../libs/federation')

const router = express.Router()

router.post('/', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  if (req.session.authorized) {
    let from = req.session.username + '@localhost:3000'
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
          // timestamp

          let timestamp = new Date().getTime()

          db.messages.insert({uid: req.session.uid, from: from, to: to, message: message, timestamp: timestamp}, function(err) {
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
