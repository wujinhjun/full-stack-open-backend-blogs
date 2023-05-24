const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
require("express-async-errors");

const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogsRouter");
const usersRouter = require("./controllers/usersRouter");
const loginRouter = require("./controllers/loginRouter");

const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.info(`error connecting to MongoDB: ${error.message}`);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
morgan.token("body", (req, res) => JSON.stringify(req.body) ?? "");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
