export default function isAuthenticated (req, res, next) { // Check if user is authenticated ------------------TO DO --------------------
    console.log(req.session.username)
    if (req.session.username) next()
    else {
      req.session.error = 'Please login to access this page' // 2 ways to display an error message on the client after redirect
      res.status(401).json({ error: true, message: 'Please login to access this page' })
      //req.flash('error', 'Please login to access this page')
      //res.redirect('/login')
    }
  }