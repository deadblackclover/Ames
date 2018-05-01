/*   Copyright (c) 2018, Asocio. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
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
