const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

const firebaseAdminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.firebaseAdminAuth = firebaseAdminApp.auth();
