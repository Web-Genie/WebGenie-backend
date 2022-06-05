const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  dbName: "WebGenie"
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", console.log.bind(console, "Connected to database.."));

module.exports = db;
