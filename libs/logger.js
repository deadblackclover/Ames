/*   Copyright (c) 2018, Ames Project. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
const Asave = require('asave')

let asave = new Asave({
  path: './logs/',
  format: 'csv'
})

module.exports = asave
