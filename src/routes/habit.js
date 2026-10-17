import HabitController from '../controllers/habit_controller.js';
import express from "express";
const router = express.Router();
import verifyToken from '../middlewares/verify_token_middleware.js';

router.use(verifyToken);

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

router.put("/update", async (req, res) => {
  
  let habitController  = new HabitController(); 
  let newList = habitController.updateHabit(req.body);

  res.send({updatedHabits:newList});
});

router.delete("/remove/:id", async (req, res) => {
  
  let habitController  = new HabitController(); 
  let newList = habitController.removeHabit(req.params.id);

  res.send({updatedHabits:newList});
});

export default router;
