import Express from 'express'
import dataRouter from './routes/routes.js'
import path from 'path'
import session from 'express-session'
import { Mongo } from './mongo/mongoClient.js'
import MongoStore from 'connect-mongo'
import cors from 'cors'
const store = new session.MemoryStore()
path.__dirname = path.resolve(path.dirname('./client/public/index.html'))

const PORT = 3000;
const app = new Express();

app.use(Express.json());
app.use(cors())
// -- Function for initializing a connection to the MongoDB Atlas database, so that sessions work (timing error) --
async function connectToMongoDB() {
    try {
        await Mongo.connect()
        console.log('Connected to MongoDB Atlas')
    } catch (err) {
        console.error('Failed to connect to MongoDB Atlas')
        console.error(err)
    }
    return Mongo
}
connectToMongoDB()
// -- For testing, REMOVE before deployment --
app.use((req, res, next) => {
    console.log(`${req.method} request at ${req.url}`)
    next()
})
// -------------------------------------------

const sessionOptions = {
    name: 'connect.sid', // default name is 'connect.sid
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store : MongoStore.create({ client: Mongo, dbName: 'Sessions' }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }

app.use(session(sessionOptions))

app.use(Express.static(path.join('./client/public')));

app.use('/api', dataRouter);

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './client/public' })
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
});

