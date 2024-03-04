
export default function checkCookie(req, res) {
  if (req.session.email) {
    res.status(200).json({ message: "User is logged in", loggedIn: true});
    return
  } else {
    res.status(200).json({ message: "User is not logged in", loggedIn: false});
  }
}


