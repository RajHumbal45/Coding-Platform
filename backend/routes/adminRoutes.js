const express = require("express");
const {
  getAdminSheet,
  replaceSheet,
  addChapter,
  addTopic,
  addProblem,
} = require("../controllers/adminController");
const { protect, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, requireAdmin);

router.get("/sheet", getAdminSheet);
router.put("/sheet", replaceSheet);
router.post("/chapter", addChapter);
router.post("/chapter/:chapterId/topic", addTopic);
router.post("/chapter/:chapterId/topic/:topicId/problem", addProblem);

module.exports = router;
