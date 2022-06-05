const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    websites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
