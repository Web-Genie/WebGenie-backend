const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userSavedCode: {
      type: String,
    },
    isDeployed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("website", websiteSchema);
