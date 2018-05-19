/*   Copyright (c) 2018, Ames Project. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
const axios = require('axios')
const logger = require('../libs/logger')

let webfinger = (host, acct) => {
  return new Promise((resolve, reject) => {
    var url = 'http://' + host + '/.well-known/webfinger?resource=acct:' + acct
    axios.get(url).then(function(res) {
      resolve(res.data)
    }).catch(function(err) {
      logger.save('federation', err)
      reject(err)
    })
  })
}

let send = (host, uid, from, to, message) => {
  var url = 'http://' + host + '/api/receive/users/' + uid
  axios.post(url, {
    from: from,
    to: to,
    message: message
  }).then(function(res) {
    if (!res.data) {
      logger.save('federation', 'Error send message to any server')
    }
  }).catch(function(err) {
    logger.save('federation', err)
  })
}

module.exports = {
  send: send,
  webfinger: webfinger
}
