const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  head: {
    titleTemplate: '%s - Ames',
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}
    ]
  },
  build: {
    vendor: ['axios']
  },
  css: [
    {lang:'stylus', src:'~/assets/css/main.styl'}
  ],
  cache: false,
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 * 60 * 24 * 2 }
    }),
    '~/api'
  ]
}
