/*   Copyright (c) 2018, Asocio. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
export default function({ redirect, req }) {
  delete req.session.authorized
  delete req.session.username
  delete req.session.guid
  return redirect('/')
}
