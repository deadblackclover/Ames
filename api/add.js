/*   Copyright (c) 2018, Ames Project. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')

const router = express.Router()

router.post('/contact', (req, res) => {
  if (req.session.authorized) {
    let uid = req.session.uid
    let contact = req.body.contact
    db.contacts.insert({uid: uid, contact: contact}, function(err) {
        if (err) { logger.save('dbContacts', err) }
        res.send(true)
    })
  } else {
    res.send(false)
  }
})

module.exports = router
