const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const connectionString = `mongodb+srv://stephenson36:codingBootcamp123@cluster0.n8ie9.mongodb.net/mern_db?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
