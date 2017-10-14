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
  let name = req.body.name;
  db.find({nickname: name}, function (err, docs) {
    if(err){Asave.save('dbfind',err);}
    if(docs[0] != undefined){
      res.send(true);
    }else{
      res.send(false);
    }
  })
})

module.exports = router;
