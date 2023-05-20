const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const Blog = require("./models/blog");

const blogsRouter = require("./controllers/blogsRouter");
const app = express();

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
morgan.token("body", (req, res) => JSON.stringify(req.body) ?? "");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/blogs", blogsRouter);

module.exports = app;
