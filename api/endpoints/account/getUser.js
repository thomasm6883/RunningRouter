import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function getUser (req, res) {
    const username = req.query.username;
    const databaseName = "main";
    const collectionName = "user";
    queryMongoDatabase(async db => {
        const user = await db.collection(collectionName).findOne({ fName: username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    }, databaseName);
}
