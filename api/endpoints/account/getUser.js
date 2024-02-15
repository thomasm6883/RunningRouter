import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function getUser (req, res) {
    const email = req.session.email;
    const databaseName = "main";
    const collectionName = "user";
    queryMongoDatabase(async db => {
        const user = await db.collection(collectionName).findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    }, databaseName);
}
