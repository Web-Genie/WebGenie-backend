const admin = require("firebase-admin");

exports.decodeToken = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    const existedUser = await admin.auth().verifyIdToken(idToken);

    if (existedUser) {
      req.user = existedUser;

      return next();
    }

    return res.json({ message: "Unauthorized" });
  } catch (error) {
    return res.json({ message: "internal error" });
  }
};
