// Imports
const { routerApi } = require("./routes");

// Libraries
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const boom = require("@hapi/boom");

const app = express();

const whiteList = [];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(boom.unauthorized());
    }
  },
};
app.use(helmet());
app.use(cors(options));
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("I am a HOME");
});

routerApi(app);

module.exports = app;
