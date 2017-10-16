const Datastore = require('nedb');
const asave = require('asave');

let Asave = new asave({
  path: './logs/',
  format: 'csv'
});

let db = new Datastore({filename: './db/users'});
db.loadDatabase(function(err) {
  if(err){Asave.save('dbconnect', err);}
});

module.exports = db;
