import queryMongoDatabase from '../../mongo/mongoClient.js'
import nodemailer from 'nodemailer'


export default async function forgotPassword (req, res) {
    const username = req.body.username
    const email = req.body.email
    const siteURL = 'http://localhost:3000'

    const databaseName = 'MonkeyBusinessWebApp'
    const firstCollectionName = 'Users'
    const secondCollectionName = 'AccessKeys'

    queryMongoDatabase(async db => {
      const user = await db.collection(firstCollectionName).findOne({ username, email })
      if (user === null) { res.status(404).json({ error: true, message: 'User does not exist.' }); return; } 
      else {
        // create an encrypted link to the password reset page
        const accessKey = makeToken(16)
        const tokenExists = await db.collection(secondCollectionName).findOne({ accessKey })
        if (tokenExists !== null) { res.status(404).json({ error: true, message: 'Failed to create access key. Access Key already exists' }); return; } 
        else {
          const insertAccessKey = await db.collection(secondCollectionName).insertOne({ username, accessKey, createdAt: new Date() })
          if (insertAccessKey.insertedCount < 1) { res.status(404).json({ error: true, message: 'Failed to create access key.' }); return; } 
          else {
            const link = `${siteURL}/resetPassword?accessKey=${accessKey}`
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
  
              }
            })
            const mailOptions = {
              from: process.env.EMAIL,
              to: email,
              subject: 'Monkey Business Password Reset',
              text: `Please click the link to access your password reset page: ${link}`
            }
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error)
                res.status(404).json({ error: true, message: 'Failed to send email.' })
              } else {
                console.log('Email sent: ' + info.response)
                res.json({ error: false, message: 'Email sent successfully.' })
              }
            })
          }
        }
      }
    }, databaseName)
  }

  function makeToken (length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }
  function checkIfTokenExists (accessKey, databaseName, collectionName) {
    queryMongoDatabase(async db => {
      const tokenExists = await db.collection(collectionName).findOne({ accessKey })
        if (tokenExists !== null) {
            return true
        } else {
            return false
        }
    }
    , databaseName)
}