import { comparePasswords } from '../sharedFunctions/hashingFunctions.js'
import queryMongoDatabase from '../../mongo/mongoClient.js'

export default async function login (req, res) {
    const username = req.body.username
    const password = req.body.password
  
    const databaseName = 'MonkeyBusinessWebApp'
    const collectionName = 'Users'
    queryMongoDatabase(async db => {
      const loginSuccess = await db.collection(collectionName).findOne({ username })
      if (loginSuccess < 1) { res.status(404).json({ error: true, message: 'Username or Password could not be found.' }) } else {
        const match = await comparePasswords(password, loginSuccess.password)
        if (match.valueOf() === true) {
          if (req.session.username === username) {
            res.json({ error: true, message: `User: ${username} Already Logged In Successfully` })
          } else {
            req.session.username = username
            const session = req.session
            res.send(session)
          // res.json({ error: false, message: `User: ${username} Logged In Successfully` })
          }
        } else {
          res.status(404).json({ error: true, message: 'Username or Password could not be found.' })
        }
      }
    }, databaseName)
}
  