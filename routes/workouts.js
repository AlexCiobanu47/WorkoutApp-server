const express = require("express");
const Workout = require("../models/workoutModel");
const {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const router = express.Router();
//GET all workouts
router.get("/", getAllWorkouts);
// GET a single workout
router.get("/:id", getSingleWorkout);
//POST a new workout
router.post("/", createWorkout);
//DELETE a workout
router.delete("/:id", deleteWorkout);
//UPDATE a workout
router.patch("/:id", updateWorkout);
module.exports = router;
