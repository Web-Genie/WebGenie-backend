const admin = require("firebase-admin");
const { ERROR_MESSAGE } = require("../../constants/httpManagement");

exports.decodeToken = async (req, res, next) => {
  console.log(req.headers);
  try {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    const existedUser = await admin.auth().verifyIdToken(idToken);

    if (existedUser) {
      req.user = existedUser;
      return next();
    }

    res.json({ message: ERROR_MESSAGE.NOT_AUTHENTICATED });
  } catch (error) {
    return res.json({ message: ERROR_MESSAGE.OCCURRED_SERVER_ERROR });
  }
};
