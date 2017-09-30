const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  head: {
    titleTemplate: '%s - Ames',
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}
    ],
    link: [
      { rel:"stylesheet", href:"https://fonts.googleapis.com/css?family=Rajdhani" }
    ]
  },
  build: {
    vendor: ['axios']
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/profile.css',
    '~/assets/css/blink.css',
    '~/assets/css/contacts.css'
  ],
  cache: false,
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    '~/api'
  ]
}
