import Express from 'express'
import dataRouter from './routes/routes.js'
import path from 'path'
import session from 'express-session'

const store = new session.MemoryStore()
path.__dirname = path.resolve(path.dirname('./client/public/index.html'))

const PORT = 3000;
const app = new Express();

app.use(Express.json());

// -- For testing, REMOVE before deployment --
app.use((req, res, next) => {
    console.log(`${req.method} request at ${req.url}`)
    next()
})
// -------------------------------------------

const sessionOptions = {
    name: 'example.sid', // default name is 'connect.sid
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store, // : MongoStore.create({ client: Mongo, dbName: 'MonkeyBusinessWebApp' }), // store: new MongoStore.Session({ mongooseConnection: mongoose.connection }),
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

