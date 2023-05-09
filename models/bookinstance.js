const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  // Offset time so dates are correct
  const isoDate = this.due_back.toISOString(); // the ISO date string
  const timezoneOffsetMinutes = new Date().getTimezoneOffset(); // get the timezone offset in minutes
  const timezoneOffsetMilliseconds = timezoneOffsetMinutes * 60 * 1000; // convert the offset to milliseconds
  const adjustedDate = new Date(
    new Date(isoDate).getTime() + timezoneOffsetMilliseconds
  ); // adjust the date by adding the offset

  return DateTime.fromJSDate(adjustedDate).toLocaleString(DateTime.DATE_MED);
});

BookInstanceSchema.virtual("due_back_formatted_iso").get(function () {
  // Offset time so dates are correct
  const isoDate = this.due_back.toISOString(); // the ISO date string
  const timezoneOffsetMinutes = new Date().getTimezoneOffset(); // get the timezone offset in minutes
  const timezoneOffsetMilliseconds = timezoneOffsetMinutes * 60 * 1000; // convert the offset to milliseconds
  const adjustedDate = new Date(
    new Date(isoDate).getTime() + timezoneOffsetMilliseconds
  ); // adjust the date by adding the offset

  return DateTime.fromJSDate(adjustedDate).toISODate();
});

// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
