/*   Copyright (c) 2018, Asocio. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
const db = require('../libs/db')
const mail = require('../libs/mail')
const logger = require('../libs/logger')
const Atoken = require('atoken')
const RSA = require('../libs/RSA')

let atoken = new Atoken(16)

let authenticationUser = (email) => {
  return new Promise((resolve, reject) => {
    db.users.find({email: email}, function(err, docs) {
      if (err) {
        logger.save('dbUsers', err)
      }
      if (docs[0] !== undefined) {
        // Authentication user
        let data = docs[0]
        let token = atoken.generate()
        data.token = token
        db.users.update({email: email}, data, {}, function(err, res) {
          logger.save('dbUsers', err)
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
        let key = RSA.getKeys()

        mailPromise.then((result) => {
          db.users.insert({
            uid: uid,
            username: uid,
            url: url,
            fname: '',
            lname: '',
            email: email,
            photo: null,
            token: token,
            okey: key.public,
            ckey: key.private
          }, function(err) {
            logger.save('dbUsers', err)
          })

          db.contacts.insert({uid: uid, contact: 'admin@localhost:3000'}, function(err) {
            logger.save('dbContacts', err)
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
