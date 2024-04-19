import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function saveLocation(req, res) {
    console.log("im in");
    const email = req.session.email;
    const newLoc = req.body;
    console.log(newLoc);
    const databaseName = "main";
    const CollectionName = "specificLocation";

    queryMongoDatabase(async db => {
        const savedLoc = await db.collection(CollectionName).insertOne(newLoc);
        if (savedLoc.acknowledged  === true) {
            console.log("2");

            res.status(200).json({ message: "Location added" ,
                                   _id : savedLoc.insertedId });
        } else {
            console.log("3");

            res.status(500).json({  message: "Failed to add Location",
                                    _id : "0" });
        }
    }, databaseName);


}
