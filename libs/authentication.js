const db = require('../libs/db')
const mail = require('../libs/mail')
const logger = require('../libs/logger')
const Atoken = require('atoken')

let atoken = new Atoken(16)

let authenticationUser = (email) => {
  return new Promise((resolve, reject) => {
    db.users.find({email: email}, function(err, docs) {
      if (err) {
        logger.save('dbfind', err)
      }
      if (docs[0] !== undefined) {
        // Authentication user
        let data = docs[0]
        let token = atoken.generate()
        data.token = token
        db.users.update({email: email}, data, {}, function(err, res) {
          logger.save('dbupdate', err)
        })
        let message = `You token:${token}`
        let mailPromise = mail.send(email, 'Ames', message)
        mailPromise.then((result) => {
          resolve(result)
        })
      } else {
        // Create new user
        let token = atoken.generate()
        let url = 'localhost'
        let uid = 'sdghd7sgsdgsyd'
        //
        // Data structure
        //
        // Uid
        // Username
        // Url host
        // First Name
        // Last Name
        // Email adress
        // Photo
        // Token for auth
        // Open rsa key
        // Close rsa key
        //
        let message = `You token:${token}`
        let mailPromise = mail.send(email, 'Ames', message)

        mailPromise.then((result) => {
          db.users.insert({
            uid: uid,
            username: '',
            url: url,
            fname: '',
            lname: '',
            email: email,
            photo: null,
            token: token,
            okey: '',
            ckey: ''
          })

          db.contacts.insert({uid: uid, contact: 'deadblackclover@joindiaspora.com'})

          resolve(result)
        })
      }
    })
  })
}

module.exports = {
  authenticationUser: authenticationUser
}
