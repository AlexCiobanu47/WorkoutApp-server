const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
//GET all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};
//GET a single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout with such id" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};
//CREATE a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  //add to the database
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout with such id" });
  }
  const workout = await Workout.findOneAndReplace(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json({ workout });
};
//DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout with such id" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json({ workout });
};
module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
