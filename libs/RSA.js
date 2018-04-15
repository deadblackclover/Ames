const NodeRSA = require('node-rsa')

let getKeys = () => {
  var key = new NodeRSA({b: 512})

  return {
    public: key.exportKey('pkcs8-public'),
    private: key.exportKey('pkcs8-private')
  }
}

module.exports = {
  getKeys: getKeys
}
