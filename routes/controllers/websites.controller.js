const User = require("../../models/User");
const Website = require("../../models/Website");

exports.postWebsite = async (req, res, next) => {
  const { email } = req.user;
  const { title, userCode } = req.body;

  try {
    if (!email || !title || !userCode) {
      return next(error);
    }

    const existUser = User.findOne({ email });
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

    res.status(201).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getEachWebsite = async (req, res, next) => {
  const { email } = req.user;

  try {
    if (!email) {
      return next(error);
    }

    const user = await User.findOne({ email });
    const eachWebsite = await Website.find({ author: user._id }).populate(
      "author"
    );

    res.status(200).json(eachWebsite);
  } catch (error) {
    next(error);
  }
};

exports.deleteWebsite = async (req, res, next) => {
  const { email } = req.user;
  const websiteId = req.params.website_id;

  try {
    if (!email || !websiteId) {
      return next(error);
    }

    await Website.findByIdAndDelete(websiteId);
    await User.findOneAndUpdate(
      { email },
      { $pull: { website: websiteId } },
      { new: true }
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

exports.updateWebsite = async (req, res, next) => {
  const websiteId = req.params.website_id;
  const { title, userCode } = req.body;

  try {
    if (!websiteId || !title || !userCode) {
      return next(error);
    }

    await Website.findOneAndUpdate(
      { _id: websiteId },
      { title: title, userSavedCode: userCode }
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
