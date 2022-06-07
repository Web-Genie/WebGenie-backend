const User = require("../../models/User");
const Website = require("../../models/Website");

exports.getUser = async (req, res, next) => {
  try {
    const { name, email, picture } = req.user;
    const existUser = await User.findOne({ email });

    if (!existUser) {
      await User.create({
        name,
        email,
        image: picture,
      });

      return res.status(201).json({ message: "login success" });
    }

    const userWebsites = await Website.find({ author: existUser._id });

    res.status(200).json(userWebsites);
  } catch (error) {
    next(error);
  }
};
