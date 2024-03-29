/*   Copyright (c) 2018, Ames Project. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
const express = require('express')

const sign = require('./sign')
const profile = require('./profile')
const contacts = require('./contacts')
const add = require('./add')
const send = require('./send')
const messages = require('./messages')
const webfinger = require('./webfinger')
const receive = require('./receive')

const router = express.Router()
let app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.use('/api/sign', sign)
router.use('/api/profile', profile)
router.use('/api/profile/contacts', contacts)
router.use('/api/profile/add', add)
router.use('/api/profile/send', send)
router.use('/api/profile/messages', messages)
router.use('/api/receive', receive)
router.use('/.well-known/webfinger', webfinger)

module.exports = {
  path: '/',
  handler: router
}
