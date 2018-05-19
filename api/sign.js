/*   Copyright (c) 2018, Ames Project. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
const express = require('express')
const db = require('../libs/db')
const logger = require('../libs/logger')
const authentication = require('../libs/authentication')

const router = express.Router()

router.post('/', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  let email = req.body.email
  if (email != null) {
    let signPromise = authentication.authenticationUser(email)
    signPromise.then(
      result => {
        res.send(result)
      }
    )
  }
})

router.post('/token', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  let signIn = new Promise((resolve, reject) => {
    let token = req.body.token
    db.users.find({token:token}, function(err, docs) {
      if (err) { logger.save('dbUsers', err) }
      if (docs[0] !== undefined) {
        req.session.authorized = true
        req.session.username = docs[0].username
        req.session.uid = docs[0].uid
        resolve(true)
      } else {
        logger.save('sign', 'Error token')
        resolve(false)
      }
    })
  })
  signIn.then(
    result => {
      res.send(result)
    }
  )
})

module.exports = router
