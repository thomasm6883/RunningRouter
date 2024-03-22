import queryMongoDatabase from "../../mongo/mongoClient.js";


export default async function getSavedRoutes (req, res) {
    const email = req.session.email;
    const databaseName = "main";
    const userCollectionName = "user";
    const routeCollectionName = "routes";
    queryMongoDatabase(async db => {
        const user = await db.collection(userCollectionName).findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const savedRoutes = await db.collection(routeCollectionName).find({ email : email } , { projection: {email:0 , _id:0}}).toArray();
        if (!savedRoutes) {
            res.status(404).json({ message: "Saved routes not found"});
        } else {
            res.status(200).json(savedRoutes);
        }
    }, databaseName);
}
