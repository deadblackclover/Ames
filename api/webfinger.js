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
    data.links.push({ rel: 'http://microformats.org/profile/hcard', type: 'text/html' })
    data.links.push({ rel: 'http://joindiaspora.com/seed_location', type: 'text/html' })

    let result = query.resource.match(/(acct:)([a-zA-Z0-9]+)@([a-zA-Z0-9]+)/)
    let username = result[2]
    let url = result[3]

    db.users.find({username:username, url: url}, function(err, docs) {
      if (err) { logger.save('dbfind', err) }
      if (docs[0] !== undefined) {
        data.links[0].href = 'http://' + docs[0].url + '/hcard/users/' + docs[0].uid
        data.links[1].href = 'http://' + docs[0].url + '/'
        res.send(data)
      } else {
        res.sendStatus(404)
      }
    })
  }
})

module.exports = router
