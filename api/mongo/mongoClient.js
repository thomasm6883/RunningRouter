import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
import Dotenv from 'dotenv'

Dotenv.config()
const DB_USER = (process.env.DB_USER) ? process.env.DB_USER : 'unknown'
const DB_PASS = process.env.DB_PASS ?? 'unknown'
// const apiKey = 'b4j3Sx7dSOst3JMj4P5tddrvKgFbwunvsnsi039rxf3PllmCSwYA129X9GWO1lqt'

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@monkeybusinesscluster.bkutl1e.mongodb.net/?retryWrites=true&w=majority`

export const Mongo = new MongoClient(url, {
  serverApi:
  {
    version: ServerApiVersion.v1,
    strict: true
  }
})

export default function queryMongoDatabase (queryCallback, databaseName) {
  queryCallback(Mongo.db(databaseName))
    .catch(err => {
      console.error('Failed to query database')
      console.error(err)
    })
}
//------------------MongoDB Atlas Connection Test --------------------

// async function run(databaseName, collectionName) {
//   try {
//     const database = Mongo.db(databaseName)
//     const movies = database.collection(collectionName)
//     const o_id = new ObjectId("651dec44f8c800a5da81622b")
//       const query = { _id: o_id }
//     const options = { }
//     const cursor = movies.find(query, options)
//     if ((await movies.countDocuments(query)) === 0) {
//       console.log("No documents found!")
//     }
//     for await (const doc of cursor) {
//       console.dir(doc)
//     }
//   } finally {
//     console.log("Closing connection")
//   }
// }
// run(databaseName, collectionName).catch(console.dir);