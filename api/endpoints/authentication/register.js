import queryMongoDatabase from '../../mongo/mongoClient.js'
import { hashPassword } from '../sharedFunctions/hashingFunctions.js'
import validateEmail from '../sharedFunctions/emailFunctions.js'

export default async function register (req, res) { // working without authentication ------------------TO DO --------------------
    const password = req.body.password
    const passwordConfirm = req.body.passwordConfirm
    const email = req.body.email

    const databaseName = 'main'
    const collectionName = 'user'

    if (password !== passwordConfirm) { res.status(404).json({ error: true, message: 'Passwords do not match.' }); return }
    else if (validateEmail(email) === false) { res.status(404).json({ error: true, message: 'Invalid Email.' }); return }
    queryMongoDatabase(async db => {
      const checkExistingUser = await db.collection(collectionName).findOne({ email })
      if ((checkExistingUser) !== null) { res.status(404).json({ error: true, message: 'User Already Exists.' }); return; }
      const passwordHash = await hashPassword(password)
      const savedRoutes = []
        const insertUser = await db.collection(collectionName).insertOne({ email, password: passwordHash, savedRoutes })
        if (insertUser.insertedCount === null) { res.status(404).json({ error: true, message: 'Failed to insert user info!' }) }

        else {
          req.session.email = email
          const session = req.session
          res.send(session)
        }
    }, databaseName)
  }
