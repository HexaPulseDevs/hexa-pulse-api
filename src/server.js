// Imports
const { config } = require("./config/config");
const app = require("./app");

const port = config.port;

app.listen(port);
