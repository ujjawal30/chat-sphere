const { Router } = require("express");
const {
  getChats,
  getAllChats,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatContollers");
const { protectedRoute } = require("../middlewares/authMiddleware");

const router = Router();

router.route("/").get(protectedRoute, getAllChats);
router.route("/:userId").get(protectedRoute, getChats);
router.route("/create-group").post(protectedRoute, createGroup);
router.route("/rename-group").put(protectedRoute, renameGroup);
router.route("/add-user").put(protectedRoute, addToGroup);
router.route("/remove-user").put(protectedRoute, removeFromGroup);

module.exports = router;
