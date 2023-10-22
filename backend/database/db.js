const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

const ConnectDB = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("db connected");
};

module.exports = ConnectDB;
