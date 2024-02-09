import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function updateUser (req, res) {
    const username = req.body.username;
    const databaseName = "runningDB";
    const collectionName = "users";
    queryMongoDatabase(async db => {
        const user = await db.collection(collectionName).findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const update = await db.collection(collectionName).updateOne({ username });
        if (update.modifiedCount === 1) {
            res.status(200).json({ message: "User updated" });
        } else {
            res.status(500).json({ message: "Failed to update user" });
        }
    }, databaseName);
}
