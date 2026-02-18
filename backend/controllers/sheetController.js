const Sheet = require("../models/Sheet");

const getSheet = async (_req, res) => {
  const sheet = await Sheet.findOne({ key: "default" }).lean();
  return res.status(200).json({ data: sheet?.data || [] });
};

module.exports = { getSheet };
