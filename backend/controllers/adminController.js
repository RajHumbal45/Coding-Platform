const Sheet = require("../models/Sheet");

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const ensureUniqueId = (base, used) => {
  let candidate = base || "item";
  let i = 1;
  while (used.has(candidate)) {
    i += 1;
    candidate = `${base}-${i}`;
  }
  return candidate;
};

const ensureSheet = async () => {
  const sheet = await Sheet.findOne({ key: "default" });
  if (!sheet) {
    return Sheet.create({ key: "default", data: [] });
  }

  return sheet;
};

const getAdminSheet = async (_req, res) => {
  const sheet = await ensureSheet();
  return res.status(200).json({ data: sheet.data });
};

const replaceSheet = async (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ message: "data must be an array" });
  }

  const sheet = await ensureSheet();
  sheet.data = data;
  await sheet.save();

  return res.status(200).json({ message: "Sheet updated", data: sheet.data });
};

const addChapter = async (req, res) => {
  const { chapter } = req.body;

  if (!chapter) {
    return res.status(400).json({ message: "chapter is required" });
  }

  const sheet = await ensureSheet();
  if (sheet.data.some((c) => c.chapter.toLowerCase() === chapter.toLowerCase().trim())) {
    return res.status(409).json({ message: "Chapter already exists" });
  }

  const usedIds = new Set(sheet.data.map((c) => c.id));
  const id = ensureUniqueId(slugify(chapter), usedIds);
  sheet.data.push({ id, chapter, topics: [] });
  await sheet.save();

  return res.status(201).json({ message: "Chapter added", data: sheet.data });
};

const addTopic = async (req, res) => {
  const { chapterId } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const sheet = await ensureSheet();
  const chapter = sheet.data.find((c) => c.id === chapterId);

  if (!chapter) {
    return res.status(404).json({ message: "Chapter not found" });
  }

  if (chapter.topics.some((t) => t.title.toLowerCase() === title.toLowerCase().trim())) {
    return res.status(409).json({ message: "Topic already exists in this chapter" });
  }

  const usedIds = new Set(chapter.topics.map((t) => t.id));
  const id = ensureUniqueId(slugify(title), usedIds);
  chapter.topics.push({ id, title, problems: [] });
  await sheet.save();

  return res.status(201).json({ message: "Topic added", data: sheet.data });
};

const addProblem = async (req, res) => {
  const { chapterId, topicId } = req.params;
  const { title, level, youtube, practice, article } = req.body;

  if (!title || !level || !youtube || !practice || !article) {
    return res.status(400).json({ message: "All problem fields are required" });
  }

  const sheet = await ensureSheet();
  const chapter = sheet.data.find((c) => c.id === chapterId);

  if (!chapter) {
    return res.status(404).json({ message: "Chapter not found" });
  }

  const topic = chapter.topics.find((t) => t.id === topicId);

  if (!topic) {
    return res.status(404).json({ message: "Topic not found" });
  }

  if (topic.problems.some((p) => p.title.toLowerCase() === title.toLowerCase().trim())) {
    return res.status(409).json({ message: "Problem already exists in this topic" });
  }

  const usedIds = new Set(topic.problems.map((p) => p.id));
  const id = ensureUniqueId(slugify(title), usedIds);
  topic.problems.push({ id, title, level, youtube, practice, article });
  await sheet.save();

  return res.status(201).json({ message: "Problem added", data: sheet.data });
};

module.exports = { getAdminSheet, replaceSheet, addChapter, addTopic, addProblem };
