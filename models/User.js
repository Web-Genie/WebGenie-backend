const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    websites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "website",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
