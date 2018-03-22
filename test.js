import test from 'ava'
import fs from 'fs'
import logger from './libs/logger'
import db from './libs/db'

test('empty test', t => {
  t.pass()
})

test.cb('logger', t => {
  logger.save('test', 'test')

  fs.readFileSync('./logs/test.csv', function(err, data) {
    if (err) throw err
    t.regex(data, /test/gi)
  })
  t.end()
})

test.cb('db users', t => {
  db.users.insert({
    uid: '0123456789',
    username: 'username',
    url: 'localhost',
    fname: 'First',
    lname: 'Last',
    email: 'username@test',
    photo: null,
    token: 'token',
    okey: '',
    ckey: ''
  }, function(err) {
    t.fail(err)
  })
  
  db.users.find({token:'token'}, function(err, docs) {
    if(err) throw err
    t.is(docs[0].uid,'0123456789')
  })

  t.end()
})