const router = require("express").Router();

const { languageController } = require("../Controllers/Languages/language");
const { LevelController } = require("../Controllers/Levels/level");

// 🟢 Get total counts
router.get("/forumstats", languageController.getForumStats);

router.get("/getLanguageStats", languageController.getLanguageStats);

// Get All languages Details
router.get("/getLanguages", languageController.getLanguages);

// Get Language label,name for spcific language id
router.get("/getLanguage", languageController.getLanguage);

router.get(
  "/getLevelStatsForLanguage",
  LevelController.getLevelStatsForLanguage
);

router.get("/getRecentPostsByLanguage", LevelController.getRecentPostsByLanguage);

// Get level name and label for id
router.get("/getLevel", LevelController.getLevel);

// Get Level count for spcific language id
router.get("/getLevelForLanguage", LevelController.getLevelForLanguage);

// Get Level Details from Language URL
router.get("/getLevels/:lang_url", LevelController.getLevel);

// Get All Levels
router.get("/getLevels", LevelController.getLevels);

router.get("/clear-Acc-Option", (req, res) => {
  res.clearCookie("Ac_select");
});

module.exports = router;
