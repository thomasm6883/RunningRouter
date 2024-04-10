import queryMongoDatabase from "../../mongo/mongoClient.js";
import {ObjectId} from "mongodb"

export default async function deleteLocation(req,res){
    //const locationName = req.body.locationName;
    //const email = req.session.email;
    const databaseName = "main";
    const collectionName = "specificLocation";
    const locId = req.body._id;
    let _id = new ObjectId(locId) 

    queryMongoDatabase(async db =>{
        const removeLoc = await db.collection(collectionName).deleteOne({ _id: _id }); 
        if (removeLoc.acknowledged  === true) { 
            res.status(200).json({ message: "Location deleted" });
        } else {
            res.status(500).json({ message: "Failed to delete Location" });
        }
    
    },databaseName)

}