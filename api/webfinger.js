/*   Copyright (c) 2018, Asocio. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')
const url = require('url')

const router = express.Router()

router.get('/', (req, res) => {
  if (!req.url) return res.sendStatus(400)
  let urlParts = url.parse(req.url, true)
  let query = urlParts.query
  if (query.resource === undefined) {
    res.sendStatus(400)
  } else {
    let data = {}
    data.subject = query.resource
    data.links = []

    let result = query.resource.match(/(acct:)([a-zA-Z0-9]+)@([a-zA-Z0-9]+)/)
    let username = result[2]
    let url = result[3]

    db.users.find({username:username, url: url}, function(err, docs) {
      if (err) { logger.save('dbUsers', err) }
      if (docs[0] !== undefined) {
        data.links.push({ properties:{ 'http://localhost:3000/users/uid': docs[0].uid } })
        data.links.push({ properties:{ 'http://localhost:3000/users/open-key': docs[0].okey } })
        res.send(data)
      } else {
        res.sendStatus(404)
      }
    })
  }
})

module.exports = router
