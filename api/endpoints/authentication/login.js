import { comparePasswords } from '../sharedFunctions/hashingFunctions.js'
import queryMongoDatabase from '../../mongo/mongoClient.js'

export default async function login (req, res) {
    const email = req.body.email
    const password = req.body.password

    const databaseName = 'main'
    const collectionName = 'user'
    queryMongoDatabase(async db => {
      const loginSuccess = await db.collection(collectionName).findOne({ email })
      if (loginSuccess < 1) { res.status(404).json({ error: true, message: 'email or Password could not be found.' }) } else {
        const match = await comparePasswords(password, loginSuccess.password)
        if (match.valueOf() === true) {
          if (req.session.email === email) {
            res.json({ error: true, message: `User: ${email} Already Logged In Successfully` })
          } else {
            req.session.email = email
            const session = req.session
            res.send(session)
          // res.json({ error: false, message: `User: ${email} Logged In Successfully` })
          }
        } else {
          res.status(404).json({ error: true, message: 'email or Password could not be found.' })
        }
      }
    }, databaseName)
}
