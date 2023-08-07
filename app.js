const express = require("express")
const app = express();
const listRoutes = require("./routes/list")
const ExpressError = require("./expressError")
const morgan = require("morgan");

app.use(express.json());
app.use("/list", listRoutes);
app.use(morgan("dev"));

// To handle 404 errors.
app.use(function (req, res, next) {
  return new ExpressError("Page Not Found", 404);
});


// To handle all other errors.
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});


module.exports = app;