export default function ({ redirect, req }) {
  if(!req.session.authorized){
    return redirect('/');
  }
}
