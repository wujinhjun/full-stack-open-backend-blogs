require("dotenv").config();
const PORT = process.env.PORT ?? 3003;
const SECRET = process.env.SECRET;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
// const MONGODB_URI = process.env.TEST_MONGODB_URI;

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
};
