import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function deleteRoute (req, res) {
    const username = req.body.username;
    const route = req.body.route;
    const databaseName = "runningDB";
    const collectionName = "users";
    queryMongoDatabase(async db => {
        const user = await db.collection(collectionName).findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // For the next line, I am using the updateOne method to remove the route from the savedRoutes array.
        // This only removes the route and does not update the state of the client.
        // Either call getSavedRoutes or use findOneAndUpdate to remove the route from the array and return the updated array.
        const removeRoute = await db.collection(collectionName).updateOne({ username }, { $pull: { savedRoutes: { route } } }); // this needs to be updated to use the index of the route in the array
        if (removeRoute.modifiedCount === 1) {
            res.status(200).json({ message: "Route deleted" });
        } else {
            res.status(500).json({ message: "Failed to delete route" });
        }
    }, databaseName);
}
