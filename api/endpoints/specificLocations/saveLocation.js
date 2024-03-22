import queryMongoDatabase from "../../mongo/mongoClient.js";


export default async function saveRoute(req, res) {
    const email = req.session.email; 
    const newLoc = req.body;
    const databaseName = "main";
    const CollectionName = "specificLocation";

    queryMongoDatabase(async db => {
        newLoc = req.body
        const saveRoute = await db.collection(CollectionName).insertOne(newLoc);
    }, databaseName);

}