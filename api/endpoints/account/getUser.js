import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function getUser (req, res) {
    const username = req.body.username;
    const databaseName = "runningDB";
    const collectionName = "users";
    queryMongoDatabase(async db => {
        const user = await db.collection(collectionName).findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    }, databaseName);
}
