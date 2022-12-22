const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ResListSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
});

module.exports = mongoose.model("ResList", ResListSchema);
