import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function getSavedRoutes (req, res) {
    const email = req.session.email;
    const databaseName = "main";
    const collectionName = "user";
    queryMongoDatabase(async db => {
        const savedRoutes = await db.collection(collectionName).findOne({ email }, { projection: { savedRoutes: 1 } });
        if (!savedRoutes) {
            res.status(404).json({ message: "Saved routes not found" });
        } else {
            res.status(200).json(savedRoutes);
        }
    }, databaseName);
}
