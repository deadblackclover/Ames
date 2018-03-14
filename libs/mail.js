const logger = require('../libs/logger')

const sendmail = require('sendmail')({
  logger: {
    debug: function () {},
    info: function () {},
    warn: function () {},
    error: function () {}
  },
  silent: false,
  dkim: false,
  devPort: false
})

function send(email,sub,mes) {
  return new Promise((resolve, reject) => {
    sendmail({
      from: 'core@ames.test',
      to: email,
      subject: sub,
      html: mes,
    }, function(err, reply) {
      if(err){
        logger.save('email',err)
        resolve(false)
      }else{
        resolve(true)
      }
    })
  })
}

module.exports = {
  send: send,
}
