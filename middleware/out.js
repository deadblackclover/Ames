export default function ({ redirect, req }) {
  delete req.session.authorized;
  delete req.session.email;
  return redirect('/');
}
