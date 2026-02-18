const Progress = require("../models/Progress");
const Sheet = require("../models/Sheet");

const listProblemIds = (sheetData) => {
  const ids = new Set();

  for (const chapter of sheetData) {
    for (const topic of chapter.topics || []) {
      for (const problem of topic.problems || []) {
        ids.add(problem.id);
      }
    }
  }

  return ids;
};

const getProgress = async (req, res) => {
  let progress = await Progress.findOne({ user: req.user._id });

  if (!progress) {
    progress = await Progress.create({ user: req.user._id, completedProblemIds: [] });
  }

  return res.status(200).json({ completedProblemIds: progress.completedProblemIds });
};

const updateProgress = async (req, res) => {
  const { problemId } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({ message: "completed must be a boolean" });
  }

  const sheet = await Sheet.findOne({ key: "default" }).lean();
  const validProblemIds = listProblemIds(sheet?.data || []);

  if (!validProblemIds.has(problemId)) {
    return res.status(404).json({ message: "Problem not found in sheet" });
  }

  let progress = await Progress.findOne({ user: req.user._id });

  if (!progress) {
    progress = await Progress.create({ user: req.user._id, completedProblemIds: [] });
  }

  const exists = progress.completedProblemIds.includes(problemId);

  if (completed && !exists) {
    progress.completedProblemIds.push(problemId);
  }

  if (!completed && exists) {
    progress.completedProblemIds = progress.completedProblemIds.filter((id) => id !== problemId);
  }

  await progress.save();

  return res.status(200).json({ completedProblemIds: progress.completedProblemIds });
};

module.exports = { getProgress, updateProgress };
