const db = require('../libs/db');
const express = require('express');
const logger = require('../libs/logger');

const router = express.Router();

router.post("/", (req, res) => {
  if(req.session.authorized){
    let email = req.session.email;
    db.users.find({email:email}, function (err, docs) {
      if(err){logger.save('dbfind',err);}
      if(docs[0] != undefined){
        res.send(docs[0]);
      }
    });
  }
})

module.exports = router;
