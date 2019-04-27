require('dotenv').config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var i18n            =require("i18n-express");
const routes = require("./config/routes");
const mongoose = require("mongoose");
var app = express();
app.use(async function(req, res, next) {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  next();
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
      process.exit(0)
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(i18n({
  translationsPath: path.join(__dirname, 'languages'),
  siteLangs: ["en"],
  textsVarName: 'translation'
}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

routes(app);

app.get(new RegExp('^((?!/api).)*$'), function(req, res) {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose.connection.close();

module.exports = app;
