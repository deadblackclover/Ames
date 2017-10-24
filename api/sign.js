const express = require('express');
const db = require('../libs/db');
const logger = require('../libs/logger');
const authentication = require('../libs/authentication');

const router = express.Router();

router.post("/", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let email = req.body.email;
  if (email != null){
    let signPromise = authentication.authenticationUser(email);
    signPromise.then(
      result =>{
        res.send(result);
      }
    )
  }
})

router.post("/token", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let signIn = new Promise((resolve,reject) => {
    let token = req.body.token;
    db.users.find({token:token}, function (err, docs) {
      if(err){logger.save('dbfind',err);}
      if(docs[0] != undefined){
        req.session.authorized = true;
        req.session.email = docs[0].email;
        resolve(true);
      }else{
        logger.save('sign','Error token');
        resolve(false);
      }
    });
  })
  signIn.then(
    result => {
      res.send(result);
    }
  )
})

module.exports = router;
