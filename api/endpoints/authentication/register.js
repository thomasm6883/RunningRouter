import queryMongoDatabase from '../../mongo/mongoClient.js'
import { hashPassword } from '../sharedFunctions/hashingFunctions.js'
import validateEmail from '../sharedFunctions/emailFunctions.js'
import ObjectId from 'mongodb'

export default async function register (req, res) { // working without authentication ------------------TO DO --------------------
    const username = req.body.username
    const password = req.body.password
    const passwordConfirm = req.body.passwordConfirm
    const email = req.body.email

    const databaseName = 'MonkeyBusinessWebApp'
    const collectionName = 'Users'
  
    if (password !== passwordConfirm) { res.status(404).json({ error: true, message: 'Passwords do not match.' }); return }
    else if (validateEmail(email) === false) { res.status(404).json({ error: true, message: 'Invalid Email.' }); return }
    queryMongoDatabase(async db => {
      const checkExistingUser = await db.collection(collectionName).findOne({ username })
      if ((checkExistingUser) !== null) { res.status(404).json({ error: true, message: 'Username Already Exists.' }); return; }
      const passwordHash = await hashPassword(password)
      const adminID = null
      const preferencesID = new ObjectId('651dec44f8c800a5da81622b')
        const insertUser = await db.collection(collectionName).insertOne({ username, password: passwordHash, email, preferencesID, adminID })
        if (insertUser.insertedCount === null) { res.status(404).json({ error: true, message: 'Failed to insert user info!' }) } 
        else { res.json({ error: false, message: `User: ${username} Signed Up Successfully` }) }
    }, databaseName)
  }