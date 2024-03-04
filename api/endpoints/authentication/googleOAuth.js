import queryMongoDatabase from '../../mongo/mongoClient.js'
import { OAuth2Client } from 'google-auth-library'

export default async function googleOAuth (req, res) {
  const googleAuthToken = req.body;

  const googleAuthenticationSuccess = await authenticateToken(googleAuthToken)
  if (!googleAuthenticationSuccess) {
    res.status(500).send('Failed To Authenticate Google Token')
    return
  } else {
    // Check if user exists in database
    const databaseName = 'main'
    const collectionName = 'user'
    queryMongoDatabase(async db => {

      const user = await db.collection(collectionName).findOne({ email: googleAuthenticationSuccess.email }, { projection: { authenticationType: 0 } })
      if (user) {
        if (googleAuthenticationSuccess.picture !== user.picture) {
          const pictureChanged = await updateProfilePicture(googleAuthenticationSuccess)
          if (!pictureChanged) {
            res.status(500).send('Failed To Update User Picture')
            return
          }
        }
        req.session.email = googleAuthenticationSuccess.email
        req.session.picture = googleAuthenticationSuccess.picture
        const session = req.session
        res.status(200).json({ user, session })
      } else {
        const newUser = {
          email: googleAuthenticationSuccess.email,
          picture: googleAuthenticationSuccess.picture,
          savedRoutes: [],
          authenticationType: 'google'
        }
        const newUserSuccess = await db.collection(collectionName).insertOne(newUser)
        if (!newUserSuccess) {
          res.status(500).send('Failed To Create User')
          return
        } else {
          req.session.email = googleAuthenticationSuccess.email
          req.session.picture = googleAuthenticationSuccess.picture
          const session = req.session
          res.status(200).json({ googleAuthenticationSuccess, session })
        }
      }
    }, databaseName)
  }

}

async function authenticateToken (googleAuthToken) {
  const client = new OAuth2Client()
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleAuthToken.credential,
      audience: googleAuthToken.clientId
    })
    const payload = ticket.getPayload()
    return { email: payload.email, picture: payload.picture }
  } catch (err) {
    console.log('Failed To Authenticate Google Token')
    console.log(err)
    return false
  }
}

async function updateProfilePicture(googleAuthenticationSuccess) {
  const databaseName = "main";
  const collectionName = "user";
  queryMongoDatabase(async (db) => {
    const updatedUser = await db
      .collection(collectionName)
      .updateOne(
        { email: googleAuthenticationSuccess.email },
        { $set: { picture: googleAuthenticationSuccess.picture } }
      );
    if (!updatedUser) {
      console.log("Failed To Update User Picture");
      return false;
    } else {
      return true;
    }
  }, databaseName);
}
