const createError = require("http-errors");
const User = require("../../models/User");
const Website = require("../../models/Website");
const {
  HTTP_STATUS_CODE,
  ERROR_STATUS_CODE,
  HTTP_STATUS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../constants/httpManagement");

exports.postWebsite = async (req, res, next) => {
  const { email } = req.user;
  const { title } = req.body;

  try {
    if (!email) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    const existUser = await User.findOne({ email: email });
    console.log(existUser);
    const newSite = await Website.create({
      title: title,
      author: existUser._id,
      userSavedCode: { code: "" },
      isDeployed: false,
    });

    await User.findOneAndUpdate(
      { email },
      { $push: { websites: newSite._id } },
      { new: true }
    );

    res.status(HTTP_STATUS_CODE.CREATE_SUCCESS).json({ result: newSite });
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
  const { params } = req.headers;

  try {
    if (!params) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    const eachWebsite = await Website.findOne({ _id: params });

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

exports.saveWebsite = async (req, res, next) => {
  const { title, editorCode, websiteId } = req.body;
  const currentEditorVersion = {
    code: editorCode,
  };

  try {
    if (!websiteId || !title) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    const result = await Website.findById({ _id: websiteId });

    result.title = title;
    result.userSavedCode.unshift(currentEditorVersion);

    result.save();

    res.status(HTTP_STATUS_CODE.REQUEST_SUCCESS).json({ result: result });
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
  const { params } = req.headers;

  try {
    if (!email || !params) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    await Website.findByIdAndDelete(params);
    await User.findOneAndUpdate({ email }, { $pull: { websites: params } });

    const existUser = await User.findOne({ email }).lean();
    const userWebsites = await Website.find({ author: existUser._id }).lean();

    res.status(HTTP_STATUS_CODE.REQUEST_SUCCESS).json({
      message: HTTP_STATUS_MESSAGE.SUCCESS_REQUEST,
      user: existUser,
      websites: userWebsites,
    });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.deployWebsite = async (req, res, next) => {
  const { websiteId } = req.body;

  try {
    if (!websiteId) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    await Website.findOneAndUpdate(
      { _id: websiteId },
      { $set: { isDeployed: true } }
    );

    res.status(HTTP_STATUS_CODE.REQUEST_SUCCESS).json({
      message: HTTP_STATUS_MESSAGE.SUCCESS_REQUEST,
    });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.getDeployedWebsite = async (req, res, next) => {
  const { params } = req.headers;

  try {
    if (!params) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    const eachWebsite = await Website.findOne({ _id: params });

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
