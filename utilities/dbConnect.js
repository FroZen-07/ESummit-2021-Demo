const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://juecell:Mongo@123@ju-ecellcluster.m8cyb.mongodb.net/esummit2021?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected !");
});

module.exports = { db };
