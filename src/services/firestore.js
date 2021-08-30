const admin = require("firebase-admin");
const serviceAccount = require("./cma-server-2e264-firebase-adminsdk-s6xi1-531be7b93b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cma-server-2e264-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();

module.exports = {firestore};
