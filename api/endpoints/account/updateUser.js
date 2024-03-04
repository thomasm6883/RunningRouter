import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function updateUser (req, res) {
    const email = req.session.email;
    const databaseName = "main";
    const collectionName = "user";
    queryMongoDatabase(async db => {
        const user = await db.collection(collectionName).findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const update = await db.collection(collectionName).updateOne({ email });
        if (update.modifiedCount === 1) {
            res.status(200).json({ message: "User updated" });
        } else {
            res.status(500).json({ message: "Failed to update user" });
        }
    }, databaseName);
}
