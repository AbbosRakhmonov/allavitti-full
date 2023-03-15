const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Maxsulot nomini kiriting"],
  },
  description: {
    uz: {
      type: String,
      required: [true, "O`zbek tilida Maxsulot haqida ma'lumot kiriting"],
    },
    ru: {
      type: String,
      required: [true, "Rus tilida Maxsulot haqida ma'lumot kiriting"],
    },
    en: {
      type: String,
      required: [true, "Ingliz tilida Maxsulot haqida ma'lumot kiriting"],
    },
    tr: {
      type: String,
      required: [true, "Turk tilida Maxsulot haqida ma'lumot kiriting"],
    },
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
