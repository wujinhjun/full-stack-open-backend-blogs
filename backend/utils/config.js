const PORT = process.env.PORT ?? 3003;
const MONGODB_URI = `mongodb+srv://blogs:blogs-backend@blogs-backend.issmnpg.mongodb.net/?retryWrites=true&w=majority`;

module.exports = {
  PORT,
  MONGODB_URI,
};
