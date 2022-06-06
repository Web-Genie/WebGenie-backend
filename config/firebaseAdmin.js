const admin = require("firebase-admin");
const serviceAccount = require("../firebase.json");

const firebaseAdiminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.firebaseAdiminAuth = firebaseAdiminApp.auth();
