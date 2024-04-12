import queryMongoDatabase from "../../mongo/mongoClient.js";
export default async function getLocations (req, res) {
    //const email = req.session.email;
    const databaseName = "main";
    const collectionName = "specificLocation";

    const longi = req.params.longitude;
    const lati = req.params.latitude;
    const dist = req.params.dist;
    console.log(lati + " "+longi+" "+dist)

    const latiAway = Math.abs((lati/69)/2);
    const longiAway = Math.abs((longi/54.6)/2);

    const minLati = lati-latiAway;
    const maxLati = +lati + +latiAway;
    const minLongi = longi-longiAway;
    const maxLongi = +longi + +longiAway;

    console.log(minLati + " "+maxLati+" "+minLongi+" "+maxLongi)




    queryMongoDatabase(async db => {
        console.log("here3");

        const location = await db.collection(collectionName).find(
            {
                'Location.0': { $gt: +minLati, $lt: +maxLati }, 'Location.1': { $gt: +minLongi, $lt: +maxLongi }
            }
            //,{ projection: { _id:1}}
        ).toArray();
        if (!location) {
            res.status(404).json({ message: "no Locations found" });
        } else {
            res.status(200).json(location);
        }
    }, databaseName);

}