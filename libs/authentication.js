const Datastore = require('nedb');
const mail = require('../libs/mail');
const asave = require('asave');
const atoken = require('atoken');

let Asave = new asave('./logs/');
let Atoken = new atoken(16);

let authenticationUser = (email) => {
  return new Promise((resolve, reject) => {
    let db = new Datastore({filename: './db/users'});
    db.loadDatabase(function(err) {
      if (err) {
        Asave.save('dbconnect', err);
      }
    });
    db.find({email: email}, function(err, docs) {
      if (err) {
        Asave.save('dbfind', err);
      }
      if (docs[0] != undefined) {
        // Authentication user
        let data = docs[0];
        let token = Atoken.generate();
        data.token = token;
        db.update({email: email}, data, {}, function(err, res) {});
        let message = `You token:${token}`;
        let mailPromise = mail.send(email, 'Ames', message);
        mailPromise.then((result) => {
          resolve(result);
        });
      } else {
        // Create new user
        let token = Atoken.generate();
        db.insert({email: email, token: token, nickname: 'User', photo: null, contacts: ['admin@1', 'admin@2', 'admin@3']});
        let message = `You token:${token}`;
        let mailPromise = mail.send(email, 'Ames', message);
        mailPromise.then((result) => {
          resolve(result);
        });
      }
    });
  });
};

module.exports = {
  authenticationUser: authenticationUser,
};
