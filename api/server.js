import Express from 'express'
import dataRouter from './routes/routes.js'
import path from 'path'
import session from 'express-session'
import { Mongo } from './mongo/mongoClient.js'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import DotEnv from 'dotenv'
DotEnv.config()

const store = new session.MemoryStore()
path.__dirname = path.resolve(path.dirname('./client/public/index.html'))

const PORT = process.env.PORT || 3000;
const app = new Express();

app.use(Express.json());
app.use(cors())
app.use(
  helmet({
    // Customized security headers / Helmet settings
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://*.googleapis.com",
          "https://*.gstatic.com",
          "https://*.stripe.com",
          "https://*.stripe.network",
          "https://*.stripe-static.com",
          "https://*.stripe-terminal.com",
          "https://*.stripe.com",
          "https://*.stripe.network",
          "https://*.stripe-static.com",
          "https://*.stripe-terminal.com",
          "https://accounts.google.com",
          "https://accounts.google.com/gsi",
          "https://accounts.google.com/gsi/button",
          "https://lh3.googleusercontent.com/",
          "http://127.0.0.1:5000/overpassGather",
          "http://127.0.0.1:5000/getCoordinates",


        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://*.googleapis.com",
          "https://*.gstatic.com",
          "https://*.stripe.com",
          "https://*.stripe.network",
          "https://*.stripe-static.com",
          "https://*.stripe-terminal.com",
          "https://accounts.google.com/gsi/style",
          "https://accounts.google.com",
          "https://lh3.googleusercontent.com/",
          "lh3.googleusercontent.com",


        ],
        fontSrc: [
          "'self'",
          "https://*.googleapis.com",
          "https://*.gstatic.com",
          "https://accounts.google.com",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://*.googleapis.com",
          "https://*.gstatic.com",
          "https://tile.openstreetmap.org",
          "https://accounts.google.com",
          "https://lh3.googleusercontent.com/",
          "lh3.googleusercontent.com",
        ],
        connectSrc: [
          "'self'",
          "https://*.googleapis.com",
          "https://*.gstatic.com",
          "https://*.stripe.com",
          "https://*.stripe.network",
          "https://*.stripe-static.com",
          "https://*.stripe-terminal.com",
          "https://accounts.google.com",
          "http://127.0.0.1:5000/overpassGather",
          "http://127.0.0.1:5000/getCoordinates",
        ],
        frameSrc: [
          "'self'",
          "https://*.stripe.com",
          "https://*.stripe.network",
          "https://*.stripe-static.com",
          "https://*.stripe-terminal.com",
          "https://accounts.google.com",

        ],
        // workerSrc: ["'self'", "blob:"],
        // objectSrc: ["'none'"],
        // upgradeInsecureRequests: [],
        // blockAllMixedContent: [],
        // baseUri: [],
        // formAction: [],
        // frameAncestors: [],
        // navigateTo: [],
        // reportUri: [],
        // reportTo: [],
        // requireSriFor: [],
        // sandbox: [],
        // scriptSrcAttr: [],
        // styleSrcAttr: [],
        // trustedTypes: [],
        // pluginTypes: [],
        // requireTrustedTypesFor: [],
        // reportUri: [],
        // reportTo: [],
      },
    }, //
    //crossOriginOpenerPolicy: false, //
    //crossOriginResourcePolicy: false, //
    //originAgentCluster: false, //
    referrerPolicy: false, //
    //strictTransportSecurity: false, // Only allows https vs http
    //xContentTypeOptions: false, // Prevents MIME sniffing
    xDnsPrefetchControl: { allow: false }, // Prevents DNS prefetching
    //xDownloadOptions: false, // Prevents downloads from opening automatically for IE 8 Only
    //xFrameOptions: false, // Prevents Clickjacking
    //xPermittedCrossDomainPolicies: false, // Prevents Adobe Flash and Acrobat from loading content
    //xXssProtection: false, // Prevents Cross Site Scripting
  })
);
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
    name: process.env.SESSION_NAME, // default name is 'connect.sid
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store : MongoStore.create({ client: Mongo, dbName: 'Sessions' }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}
app.use(session(sessionOptions))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes Time Frame
    max: 100, // limit each IP to X requests per windowMs
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})
app.use(limiter)


app.use(Express.static(path.join('./client/public')));

app.use('/api', dataRouter);

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: './client/public' })
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
});

