import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function deleteUser (req, res) {
    const username = req.body.username;
    const databaseName = "runningDB";
    const collectionName = "users";
    queryMongoDatabase(async db => {
        const user = await db.collection(collectionName).findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const deletion = await db.collection(collectionName).deleteOne({ username });
        if (deletion.deletedCount === 1) {
            res.status(200).json({ message: "User deleted" });
        } else {
            res.status(500).json({ message: "Failed to delete user" });
        }
    }, databaseName);
}
