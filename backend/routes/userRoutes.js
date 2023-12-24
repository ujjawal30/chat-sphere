const { Router } = require("express");
const {
  registerUser,
  authUser,
  getUsers,
} = require("../controllers/userControllers");
const { protectedRoute } = require("../middlewares/authMiddleware");

const router = Router();

router.route("/").get(protectedRoute, getUsers);
router.route("/auth").post(authUser);
router.route("/register").post(registerUser);

module.exports = router;
