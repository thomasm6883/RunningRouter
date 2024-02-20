export default async function logout (req, res) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ error: true, message: 'Failed to logout' })
        } else {
          //res.sendStatus(401)
          res.json({ error: false, message: 'Logged Out Successfully' })
        }
      })
    } else {
      res.end()
    }
  }
