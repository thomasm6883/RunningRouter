import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function getSavedRoutes (req, res) {
    const username = req.body.username;
    const databaseName = "runningDB";
    const collectionName = "users";
    queryMongoDatabase(async db => {
        const savedRoutes = await db.collection(collectionName).findOne({ username }, { projection: { savedRoutes: 1 } });
        if (!savedRoutes) {
            res.status(404).json({ message: "Saved routes not found" });
        } else {
            res.status(200).json(savedRoutes);
        }
    }, databaseName);
}
