const dsaSheet = require("./dsaSheet");
const Sheet = require("../models/Sheet");

const ensureDefaultSheet = async () => {
  const existing = await Sheet.findOne({ key: "default" });

  if (!existing) {
    await Sheet.create({ key: "default", data: dsaSheet });
    console.log("Seeded default DA sheet");
  }
};

module.exports = ensureDefaultSheet;
