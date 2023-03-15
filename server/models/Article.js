const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    uz: {
      type: String,
    },
    ru: {
      type: String,
    },
    en: {
      type: String,
    },
    tr: {
      type: String,
    },
  },
  description: {
    uz: {
      type: String,
    },
    ru: {
      type: String,
    },
    en: {
      type: String,
    },
    tr: {
      type: String,
    },
  },
});

ArticleSchema.pre("save", function (next) {
  // check title and description any of them is empty
  if (!(this.title.uz || this.title.ru || this.title.en || this.title.tr)) {
    console.log(this);

    throw new Error("Maqola nomi kiritilmagan");
  }
  if (
    !(
      this.description.uz ||
      this.description.ru ||
      this.description.en ||
      this.description.tr
    )
  ) {
    throw new Error("Maqola matni kiritilmagan");
  }
  next();
});

module.exports = mongoose.model("Article", ArticleSchema);
