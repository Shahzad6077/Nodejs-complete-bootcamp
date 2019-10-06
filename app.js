const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
/*
 * 1) MIDDLERWARES
 */

app.use(morgan("dev"));
app.use(express.json());
//*------ OWN MIDDLEWARES ----------
app.use((req, res, next) => {
  console.log("Hey, from middlewares. !");
  next();
});

app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  console.log(req.requesTime);
  next();
});

/*
 * 3) ROUTES
 */

//  # MOUNTING ROUTER

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

/*
 * 4) START SERVERR
 */
module.exports = app;
