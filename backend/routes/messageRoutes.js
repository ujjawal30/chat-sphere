const { Router } = require("express");
const { protectedRoute } = require("../middlewares/authMiddleware");
const {
  sendMessage,
  getAllMessages,
} = require("../controllers/messageControllers");

const router = Router();

router.route("/").post(protectedRoute, sendMessage);
router.route("/:chatId").get(protectedRoute, getAllMessages);

module.exports = router;
