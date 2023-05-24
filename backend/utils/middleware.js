const jwt = require("jsonwebtoken");
const logger = require("./logger");
const User = require("../models/user");

const SECRET = require("../utils/config").SECRET;

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ error: err.message, type: "ValidationError" });
  } else if (err.name === "JsonWebTokenError") {
    if (req.token === null) {
      return res.status(401).json({ error: err.message });
    }
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
    // next();
  } else {
    // next(new Error());
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, SECRET);
    const user = await User.findById(decodedToken.id);
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
