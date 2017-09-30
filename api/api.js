import bodyParser from "body-parser";
import Datastore from 'nedb';
import logger from "../libs/logger";

module.exports = app => {
  let jsonParser = bodyParser.json();
  app.post("/api", jsonParser, (req, res) => {
    let db = new Datastore({filename : './db/users'});
    db.loadDatabase(function (err) {
      if(err){logger.save('dbconnect',err);}
    });
    if (!req.body) return res.sendStatus(400);
    if(req.session.authorized){
      let email = req.session.email;
      if(req.body.contacts){
        db.find({email:email}, function (err, docs) {
          if(err){logger.save('dbfind',err);}
          if(docs[0] != undefined){
            res.send(docs[0].contacts)
          }
        });
      }else if (req.body.setusername) {
        db.find({email:email}, function (err, docs) {
          let data = docs[0];
          data.nickname = req.body.username;
          db.update({ email:email }, data, {}, function (err, res) {
            if (!err) {
              res.send(true)
            }
          });
        });
      }
    }
  });
};
