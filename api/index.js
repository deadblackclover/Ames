const Datastore = require('nedb');
const express = require('express')
const asave = require('asave');
const authentication = require('../libs/authentication');

let Asave = new asave({
  path: './logs/',
  format: 'csv'                    // csv,log,txt
});
const router = express.Router()
let app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post("/sign", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let email = req.body.email;
  if (email != null){
    let signPromise = authentication.authenticationUser(email);
    signPromise.then(
      result =>{
        res.send(result)
      }
    )
  }
})

router.post("/sign/token", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let signIn = new Promise((resolve,reject) => {
    let token = req.body.token;
    let db = new Datastore({filename : './db/users'});
    db.loadDatabase(function (err) {
      if(err){Asave.save('dbconnect',err);}
    });
    db.find({token:token}, function (err, docs) {
      if(err){Asave.save('dbfind',err);}
      if(docs[0] != undefined){
        req.session.authorized = true;
        req.session.email = docs[0].email;
        resolve(true);
      }else{
        Asave.save('sign','Error token')
        resolve(false);
      }
    });
  })
  signIn.then(
    result => {
      res.send(result)
    }
  )
})

module.exports = {
  path: '/api',
  handler: router
}
