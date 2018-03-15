const Datastore = require('nedb')
const Asave = require('asave')

let asave = new Asave({
  path: './logs/',
  format: 'csv'
})

let users = new Datastore({filename: './db/users'})
let messages = new Datastore({filename: './db/messages'})

users.loadDatabase(function(err) {
  if (err) { asave.save('dbconnect', err) }
})

messages.loadDatabase(function(err) {
  if (err) { asave.save('dbconnect', err) }
})

module.exports = {
  users: users,
  messages: messages
}
