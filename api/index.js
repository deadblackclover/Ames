const express = require('express');

const sign = require('./sign');
const profile = require('./profile');
const contacts = require('./contacts');

const router = express.Router();
let app = express();

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.use('/sign', sign);
router.use('/contacts', contacts);
router.use('/profile', profile);

module.exports = {
  path: '/api',
  handler: router
}
