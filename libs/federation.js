const axios = require('axios')
const logger = require('../libs/logger')

function webfinger(host, acct) {
	var url = 'http://' + host + '/.well-known/webfinger?resource=' + acct
	axios.get(url).then(function(res) {
		return res
	}).catch(function() {
		logger.save('federation', err)
	})
}

function send(host, guid, aesKey, eMagicEvn) {
	var url = 'http://' + host + '/receive/users/' + guid
	axios.post(url, {
		'aes_key': aesKey,
		'encrypted_magic_envelope': eMagicEvn
	}).then(function(res) {
		console.log(res)
	}).catch(function(err) {
		logger.save('federation', err)
	})
}

module.exports = {
  send: send
}
