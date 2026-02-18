const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ["Easy", "Medium", "Tough"], required: true },
    youtube: { type: String, required: true, trim: true },
    practice: { type: String, required: true, trim: true },
    article: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const topicSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    problems: { type: [problemSchema], default: [] },
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    chapter: { type: String, required: true, trim: true },
    topics: { type: [topicSchema], default: [] },
  },
  { _id: false }
);

const sheetSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    data: { type: [chapterSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sheet", sheetSchema);
