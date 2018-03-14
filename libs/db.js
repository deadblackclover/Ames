const Datastore = require('nedb')
const asave = require('asave')

let Asave = new asave({
  path: './logs/',
  format: 'csv'
})

let users = new Datastore({filename: './db/users'})
let messages = new Datastore({filename: './db/messages'})

users.loadDatabase(function(err) {
  if(err){Asave.save('dbconnect', err)}
})

messages.loadDatabase(function(err) {
  if(err){Asave.save('dbconnect', err)}
})

module.exports = {
  users: users,
  messages: messages
}
