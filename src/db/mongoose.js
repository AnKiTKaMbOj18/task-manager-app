const mongoose = require("mongoose");
require("dotenv").config();

const connectionURL = process.env.CONNECTION_URL_M;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  // useFindAndModify: false
});
