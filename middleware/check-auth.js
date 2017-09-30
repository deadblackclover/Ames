import Datastore from 'nedb';

export default function ({ redirect, req }) {
  let db = new Datastore({filename : './db/users'});
  db.loadDatabase(function (err) {
    if(err){logger.save('dbconnect',err);}
  });
  if(req.session.authorized){
    // let email = req.session.email;
    // db.find({email:email}, function (err, docs) {
    //   if(err){logger.save('dbfind',err);}
    //   if(docs[0] != undefined){
    //     let data = docs[0];
    //     res.render("profile",{
    //       title: "Your Account",
    //       username: data.nickname,
    //       photo: data.photo,
    //     })
    //   }else{
    //     return redirect('/');
    //   }
    // });
  }else{
    return redirect('/');
  }
}
