import queryMongoDatabase from "../../mongo/mongoClient.js";
import { hashPassword } from "../sharedFunctions/hashingFunctions.js";

export default async function resetPassword(req, res) {
  const accessKey = req.body.accessKey;
  const username = req.body.username;
  const newPassword = req.body.password;
  const newPasswordConfirm = req.body.confirmPassword;

  const databaseName = "MonkeyBusinessWebApp";
  const firstCollectionName = "AccessKeys";
  const secondCollectionName = "Users";

  if (newPassword !== newPasswordConfirm) {
    res.status(404).json({ error: true, message: "Passwords do not match." });
    return;
  }

  queryMongoDatabase(async (db) => {
    const accessKeyPair = await db.collection(firstCollectionName).findOne({ accessKey });
    if (accessKeyPair === null) {res.status(404).json({ error: true, message: "Invalid Access Key." }); return;} 
    else if (accessKeyPair.username !== username) {res.status(404).json({ error: true, message: "Invalid Access Key." }); return;} 
    
    const passwordHash = await hashPassword(newPassword);
    const resetPassword = await db.collection(secondCollectionName).updateOne({ username: accessKeyPair.username }, { $set: { password: passwordHash } });
    if (resetPassword.modifiedCount === null) { res.status(404).json({ error: true, message: "Failed to update user info!" }); return; } 
    else { // Delete the access key after it has been used
        const deleteAccessKeyPair = await db.collection(firstCollectionName).deleteOne({ accessKey });
        if (deleteAccessKeyPair.deletedCount === null) {res.json({ error: true, message: "Failed to delete access key." });} 
        else {res.json({error: false, message: `User: ${username} Updated Successfully`, });}
    }
    }, databaseName);
}
