const express = require("express");
const { getSheet } = require("../controllers/sheetController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getSheet);

module.exports = router;
