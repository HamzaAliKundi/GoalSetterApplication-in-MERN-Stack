const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  getMe,
} = require("../controllres/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", userRegister);
router.post("/login", userLogin);

module.exports = router;
