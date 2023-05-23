const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
require("express-async-errors");

const config = require("./utils/config");
const blogsRouter = require("./controllers/blogsRouter");

const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(`error connecting to MongoDB: ${error.message}`);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
morgan.token("body", (req, res) => JSON.stringify(req.body) ?? "");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
