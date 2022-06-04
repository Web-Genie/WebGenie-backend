var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

console.log("from aram");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// {
//   _id: "a5580daaed0be4887f947bf2cbbacb01b78fb955f8183dce9d316d05a0f7a71",
//   name: "maximus johnson",
//   email: "maximusgood@gmail.com",
//   userImage: "someawesomeimage.jpg",
//   userCollections: [
//     {
//       _id: "6fd28d260b3e00394e6e94bfbf5495d07109870d458fcf300eca3d80e53fed38",
//       title: "new website 1",
//       author: {
//         type: "a5580daaed0be4887f947bf2cbbacb01b78fb955f8183dce9d316d05a0f7a71",
//       },
//       userSavedCode: "<div> awesome website codes....... </div>",
//       lastEditedAt: "2022-05-25T04:15:50.399+00:00",
//       createdAt: "2022-05-22T01:11:20.699+00:00",
//     },
//   ],
//   createdAt: "2022-02-12T14:16:12.271+00:00",
// };

// {
//   _id: "6fd28d260b3e00394e6e94bfbf5495d07109870d458fcf300eca3d80e53fed38",
//   title: "new website 1",
//   author: {
//     type: "a5580daaed0be4887f947bf2cbbacb01b78fb955f8183dce9d316d05a0f7a71",
//   },
//   userSavedCode: "<div> awesome website codes....... </div>",
//   lastEditedAt: "2022-05-25T04:15:50.399+00:00",
//   createdAt: "2022-05-22T01:11:20.699+00:00",
// };

const body = {
  title: "",
  author: "a5580daaed0be4887f947bf2cbbacb01b78fb955f8183dce9d316d05a0f7a71",
  userCode: "<div> awesome website codes....... </div>",
};
