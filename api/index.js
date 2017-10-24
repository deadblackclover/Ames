const express = require('express');

const sign = require('./sign');
const profile = require('./profile');
const contacts = require('./contacts');
const send = require('./send');
const messages = require('./messages');

const router = express.Router();
let app = express();

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
})

router.use('/sign', sign);
router.use('/profile', profile);
router.use('/profile/contacts', contacts);
router.use('/profile/send', send);
router.use('/profile/messages', messages);

module.exports = {
  path: '/api',
  handler: router
}
