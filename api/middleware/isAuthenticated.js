export default function isAuthenticated (req, res, next) {
    console.log(req.session.email)
    if (req.session.email) next()
    else {
      res.status(401).json({ error: true, message: 'Please login to access this page' })
    }
  }
