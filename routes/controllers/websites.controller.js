const User = require("../../models/User");
const Website = require("../../models/Website");
const {
  HTTP_STATUS_CODE,
  ERROR_STATUS_CODE,
  HTTP_STATUS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../constants/httpManagement");
const createError = require("http-errors");

exports.postWebsite = async (req, res, next) => {
  const { email } = req.user;
  const { title, userCode } = req.body;

  try {
    if (!email || !title || !userCode) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    const existUser = User.findOne({ email }).lean();
    const newSite = await Website.create({
      title: title,
      author: existUser._id,
      userSavedCode: userCode,
    });

    await User.findOneAndUpdate(
      { email },
      { $push: { websites: newSite._id } },
      { new: true }
    );

    res
      .status(HTTP_STATUS_CODE.CREATE_SUCCESS)
      .json({ message: HTTP_STATUS_MESSAGE.SUCCESS_CREATE });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.getEachWebsite = async (req, res, next) => {
  const { email } = req.user;

  try {
    if (!email) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    const user = await User.findOne({ email }).lean();
    const eachWebsite = await Website.find({ author: user._id }).populate(
      "author"
    );

    res.status(HTTP_STATUS_CODE.REQUEST_SUCCESS).json({ result: eachWebsite });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.deleteWebsite = async (req, res, next) => {
  const { email } = req.user;
  const websiteId = req.params.website_id;

  try {
    if (!email || !websiteId) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    await Website.findByIdAndDelete(websiteId);
    await User.findOneAndUpdate(
      { email },
      { $pull: { website: websiteId } },
      { new: true }
    );

    res
      .status(HTTP_STATUS_CODE.REQUEST_SUCCESS)
      .json({ message: HTTP_STATUS_MESSAGE.SUCCESS_REQUEST });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.updateWebsite = async (req, res, next) => {
  const websiteId = req.params.website_id;
  const { title, userCode } = req.body;

  try {
    if (!websiteId || !title || !userCode) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    await Website.findOneAndUpdate(
      { _id: websiteId },
      { title: title, userSavedCode: userCode }
    );

    res
      .status(HTTP_STATUS_CODE.REQUEST_SUCCESS)
      .json({ message: HTTP_STATUS_MESSAGE.SUCCESS_REQUEST });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};
