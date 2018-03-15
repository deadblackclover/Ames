const db = require('../libs/db')
const mail = require('../libs/mail')
const logger = require('../libs/logger')
const atoken = require('atoken')

let Atoken = new atoken(16)

let authenticationUser = (email) => {
  return new Promise((resolve, reject) => {
    db.users.find({email: email}, function(err, docs) {
      if (err) {
        logger.save('dbfind', err)
      }
      if (docs[0] != undefined) {
        // Authentication user
        let data = docs[0]
        let token = Atoken.generate()
        data.token = token
        db.users.update({email: email}, data, {}, function(err, res) {})
        let message = `You token:${token}`
        let mailPromise = mail.send(email, 'Ames', message)
        mailPromise.then((result) => {
          resolve(result)
        })
      } else {
        // Create new user
        let token = Atoken.generate()
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
        	resolve(result)
        })
      }
    })
  })
}

module.exports = {
  authenticationUser: authenticationUser
}
