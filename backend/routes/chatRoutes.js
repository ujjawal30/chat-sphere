const { Router } = require("express");
const {
  getChats,
  getAllChats,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
  createOrUpdateGroup,
} = require("../controllers/chatContollers");
const { protectedRoute } = require("../middlewares/authMiddleware");

const router = Router();

router.route("/").get(protectedRoute, getAllChats);
router.route("/:userId").get(protectedRoute, getChats);
router.route("/group").post(protectedRoute, createOrUpdateGroup);
router.route("/group/:chatId").post(protectedRoute, createOrUpdateGroup);

module.exports = router;
