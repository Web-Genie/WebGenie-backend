const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", console.log.bind(console, "MongoDB Connected "));

module.exports = db;
