const mongoose = require("mongoose");

// Connectng to MongoDB
const mongoURI = "mongodb://localhost:27017/inotebook";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
