const Datastore = require('nedb');
const express = require('express');
const asave = require('asave');

const router = express.Router();
let Asave = new asave({
  path: './logs/',
  format: 'csv'
});

router.post("/", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let db = new Datastore({filename : './db/users'});
  db.loadDatabase(function (err) {
    if(err){Asave.save('dbconnect',err);}
  });
  if(req.session.authorized){
    let email = req.session.email;
    db.find({email:email}, function (err, docs) {
      if(err){Asave.save('dbfind',err);}
      if(docs[0] != undefined){
        res.send(docs[0].contacts)
      }
    });
  }
})

module.exports = router;
