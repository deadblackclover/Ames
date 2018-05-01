/*   Copyright (c) 2018, Asocio. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')

const router = express.Router()

router.post('/', (req, res) => {
  if (req.session.authorized) {
    let uid = req.session.uid
    let to = req.body.to
    db.messages.find({uid:uid, to: to}, function(err, docs) {
      if (err) { logger.save('dbMessages', err) }
      if (docs[0] !== undefined) {
        res.send(docs)
      } else {
        res.send(false)
      }
    })
  }
})

module.exports = router
