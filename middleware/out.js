export default function({ redirect, req }) {
  delete req.session.authorized
  delete req.session.username
  delete req.session.guid
  return redirect('/')
}
