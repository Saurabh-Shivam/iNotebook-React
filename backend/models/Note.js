const mongoose = require("mongoose");
const { Schema } = mongoose;

// Creating Schema
const NotesSchema = new Schema({
  // This will enable to specify, particular notes are of which user
  // Basically we are storing the userId instead of user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
