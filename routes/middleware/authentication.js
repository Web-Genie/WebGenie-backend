const admin = require("firebase-admin");

exports.decodeToken = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    const existUser = await admin.auth().verifyIdToken(idToken);

    if (existUser) {
      req.user = existUser;

      return next();
    }

    return res.json({ message: "Unauthorized" });
  } catch (error) {
    return res.json({ message: "internal error " });
  }
};
