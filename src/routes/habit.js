import express from "express";
const router = express.Router();
import HabitController from '../controllers/habit_controller.js';

router.get("/", (req, res) => {

  let habitController  = new HabitController(); 
  let allHabits = habitController.getAllHabits();
  
  res.send({allHabitsList: allHabits});
});

router.post("/add", async (req, res) => {
  
  let habitController  = new HabitController(); 
  let newList = habitController.addHabit(req.body);

  res.send({allHabits:newList});
});

export default router;
