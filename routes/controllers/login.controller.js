const User = require("../../models/User");

exports.postUser = async (req, res, next) => {
  try {
    const { name, email, picture } = req.user;
    const existUser = await User.findOne({ email });

    if (!existUser) {
      const user = new User({
        name: name,
        email,
        image: picture,
      });

      await user.save();
      res.status(200).json("login success");
    }

  } catch (error) {
    next(error);
  }
};
