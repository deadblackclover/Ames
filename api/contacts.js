const db = require('../libs/db')
const express = require('express')
const logger = require('../libs/logger')

const router = express.Router()

router.post('/', (req, res) => {
  if (req.session.authorized) {
    let guid = req.session.guid
    db.contacts.find({guid:guid}, function(err, docs) {
      if (err) { logger.save('dbfind', err) }
      if (docs[0] !== undefined) {
        res.send(docs)
      } else {
        res.send(false)
      }
    })
  } else {
    res.send(false)
  }
})

module.exports = router
