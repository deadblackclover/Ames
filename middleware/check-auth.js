/*   Copyright (c) 2018, Ames Project. This file is
 *   licensed under the GNU General Public License version 3 or later. See
 *   the LICENSE file.
 */
export default function({ redirect, req }) {
  if (!req.session.authorized) {
    return redirect('/')
  }
}
