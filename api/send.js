const db = require('../libs/db');
const express = require('express');
const logger = require('../libs/logger');

const router = express.Router();

router.post("/", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let name = req.body.name;
  db.find({nickname: name}, function (err, docs) {
    if(err){logger.save('dbfind',err);}
    if(docs[0] != undefined){
      res.send(true);
    }else{
      res.send(false);
    }
  })
})

module.exports = router;