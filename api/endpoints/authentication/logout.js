export default async function logout (req, res) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ error: true, message: 'Failed to logout' })
        } else {
          res.sendStatus(401)
        }
      })
    } else {
      res.end()
    }
  }