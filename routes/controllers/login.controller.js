const User = require("../../models/User");
const Website = require("../../models/Website");
const {
  HTTP_STATUS_CODE,
  ERROR_STATUS_CODE,
  ERROR_MESSAGE,
} = require("../../constants/httpManagement");
const createError = require("http-errors");

exports.getUser = async (req, res, next) => {
  const { name, email, picture } = req.user;

  try {
    const existUser = await User.findOne({ email }).lean();

    if (!existUser) {
      const newUser = await User.create({
        name,
        email,
        image: picture,
      });

      return res
        .status(HTTP_STATUS_CODE.REQUEST_SUCCESS)
        .json({ user: newUser });
    }

    const userWebsites = await Website.find({ author: existUser._id }).lean();

    res
      .status(HTTP_STATUS_CODE.REQUEST_SUCCESS)
      .json({ user: existUser, websites: userWebsites });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};
