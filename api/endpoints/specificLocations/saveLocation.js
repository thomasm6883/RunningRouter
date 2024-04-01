import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function saveLocation(req, res) {
    console.log("im in");
    //const email = req.session.email; 
    const newLoc = req.body;
    const databaseName = "main";
    const CollectionName = "specificLocation";

    queryMongoDatabase(async db => {
        const savedLoc = await db.collection(CollectionName).insertOne(newLoc);
        if (savedLoc.acknowledged  === true) {
            res.status(200).json({ message: "Location added" });
        } else {
            res.status(500).json({ message: "Failed to add Location" });
        }   
    }, databaseName);
    

}