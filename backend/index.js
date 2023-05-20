const app = require("./app");
const logger = require("./utils/logger");
const PORT = require("./utils/config").PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
