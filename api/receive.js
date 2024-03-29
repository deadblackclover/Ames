/*   Copyright (c) 2018, Ames Project. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
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
    // Data structure
    // uid
    // from
    // to
    // message
    // timestamp

    let timestamp = new Date().getTime()

    db.messages.insert({uid: uid, from: from, to: to, message: message, timestamp: timestamp}, function(err) {
      logger.save('dbMessages', err)
      res.send(true)
    })
  } else {
    res.send(false)
  }
})

module.exports = router
