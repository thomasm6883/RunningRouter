import queryMongoDatabase from "../../mongo/mongoClient.js";

export default async function deleteRoute (req, res) {
    const routeName = req.body.routeName;
    const email = req.session.email;
    const databaseName = "main";
    const userCollectionName = "user";
    const routeCollectionName = "routes";
    queryMongoDatabase(async db => {
        const user = await db.collection(userCollectionName).findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const removeRoute = await db.collection(routeCollectionName).deleteMany({ email:email , routeName:routeName  }); 

        if (removeRoute.acknowledged  === true) { 
            res.status(200).json({ message: "Route deleted" });
        } else {
            res.status(500).json({ message: "Failed to delete route" });
        }
    }, databaseName);
}