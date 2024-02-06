import Mongo from 'mongodb'
import Dotenv from 'dotenv'

Dotenv.config()

const DB_USER = process.env.DB_USER ?? 'unknown'
const DB_PASS = process.env.DB_PASS ?? 'unknown'

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ej6o2hm.mongodb.net/?retryWrites=true&w=majority`;

//const client = new Mongo.MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true, serverApi: Mongo.ServerApiVersion.v1 })

export default async function queryDatabase(queryCallBack, databaseName) {
  let client;
  try {
    client = new Mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: Mongo.ServerApiVersion.v1 });
    await client.connect();
    await queryCallBack(client.db(databaseName));
  } catch (err) {
    console.error('---------NEW MONGO ERROR---------');
    console.error(err);
  } finally {
    if (client) {
      await client.close();
    }
  }
}
