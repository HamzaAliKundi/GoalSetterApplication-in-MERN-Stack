const express = require("express");
const route = express.Router();
const {
  getGoals,
  settGoal,
  deleteGoal,
  updateGoal,
} = require("../controllres/goalController");
const { protect } = require("../middleware/authMiddleware");

route.route("/").get(protect, getGoals).post(protect, settGoal);
route.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);
route.route("/:id").get(protect, updateGoal);

module.exports = route;
