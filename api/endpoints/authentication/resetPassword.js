import queryMongoDatabase from "../../mongo/mongoClient.js";
import { hashPassword } from "../sharedFunctions/hashingFunctions.js";

export default async function resetPassword(req, res) {
  const accessKey = req.body.accessKey;
  const email = req.body.email;
  const newPassword = req.body.password;
  const newPasswordConfirm = req.body.confirmPassword;

  const databaseName = "main";
  const firstCollectionName = "AccessKeys";
  const secondCollectionName = "user";

  if (newPassword !== newPasswordConfirm) {
    res.status(404).json({ error: true, message: "Passwords do not match." });
    return;
  }

  queryMongoDatabase(async (db) => {
    const accessKeyObject = await db.collection(firstCollectionName).findOne({ accessKey });
    if (accessKeyObject === null) {res.status(404).json({ error: true, message: "Invalid Access Key." }); return;}
    else if (accessKeyObject.email !== email) {res.status(404).json({ error: true, message: "Invalid Access Key." }); return;}

    const passwordHash = await hashPassword(newPassword);
    const resetPassword = await db.collection(secondCollectionName).updateOne({ email: accessKeyObject.email }, { $set: { password: passwordHash } });
    if (resetPassword.modifiedCount === null) { res.status(404).json({ error: true, message: "Failed to update user info!" }); return; }
    else { // Delete the access key after it has been used
        const deleteAccessKeyObject = await db.collection(firstCollectionName).deleteOne({ accessKey });
        if (deleteAccessKeyObject.deletedCount === null) {res.json({ error: true, message: "Failed to delete access key." });}
        else {res.json({error: false, message: `User: ${email} Updated Successfully`, });}
    }
    }, databaseName);
}
