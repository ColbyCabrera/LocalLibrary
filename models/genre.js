const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const genreSchema = Schema({
  name: { type: String, required: true, maxLength: 100 },
});

genreSchema.virtual("url").get(function () {
    return `/catalog/genre/${this._id}`;
});

module.exports = mongoose.model("Genre", genreSchema);