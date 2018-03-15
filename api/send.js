const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')
const federation = require('../libs/federation')

const router = express.Router()

router.post('/', (req, res) => {
  let href
  if (!req.body) return res.sendStatus(400)
  if (req.session.authorized) {
    let to = req.body.to
    let message = req.body.message
    if (to.indexOf('@') !== -1) {
      let name = to.substring(0, to.indexOf('@'))
      let host = to.substring(to.indexOf('@') + 1)

      let webfinger = federation.webfinger(host, name)
      for (var i = 0; i < webfinger.links.length; i++) {
        if (webfinger.links[i].rel === 'http://microformats.org/profile/hcard') {
          href = webfinger.links[i].href
        }
      }
      if (href.indexOf('/hcard/users/') !== -1) {
        let guid = href.substring(href.indexOf('/hcard/users/') + 12)
        federation(host, guid, '', '')
      } else {
        res.send(false)
      }
    } else {
      res.send(false)
    }
  } else {
    res.send(false)
  }
})

module.exports = router
