import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function deleteUser (req, res) { // add logout functionality when user is deleted
    const email = req.session.email;
    const databaseName = "main";
    const collectionName = "user";
    queryMongoDatabase(async db => {
        const user = await db.collection(collectionName).findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const deletion = await db.collection(collectionName).deleteOne({ email });
        if (deletion.deletedCount === 1) {
            res.status(200).json({ message: "User deleted" });
        } else {
            res.status(500).json({ message: "Failed to delete user" });
        }
    }, databaseName);
}
