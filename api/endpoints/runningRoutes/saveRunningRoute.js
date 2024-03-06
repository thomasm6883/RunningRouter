import queryMongoDatabase from "../../mongo/mongoClient.js";


export default async function saveRoute(req, res) {
    const email = req.session.email; 
    const newRoute = req.body;
    const databaseName = "main";
    const userCollectionName = "user";
    const routeCollectionName = "routes";

    queryMongoDatabase(async db => {
        const user = await db.collection(userCollectionName).findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (newRoute == null) { //may need a more complex bool function
            res.status(404).json({ message: "Route data not recognized" });
            return;
        }

        newRoute.email = email;
        //get users current routes
        const newRouteName = newRoute.routeName
        const currRoute = await db.collection(routeCollectionName).findOne({ email : email , routeName : newRouteName  });
        if (currRoute) {
            res.status(404).json({ message: "User already has route with that name" });
            return;
        }

        const saveRoute = await db.collection(routeCollectionName).insertOne(newRoute);
        
        if (saveRoute.acknowledged  === true) {
            res.status(200).json({ message: "Route added" });
        } else {
            res.status(500).json({ message: "Failed to add route" });
        }

    }, databaseName);
}
