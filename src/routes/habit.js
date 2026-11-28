import habitController from '../controllers/habit_controller.js';
import express from "express";
const router = express.Router();
import verifyToken from '../middlewares/verify_token_middleware.js';

router.use(verifyToken);

router.get("/", habitController.getAllHabits);
router.post("/add", habitController.addHabit);
router.put("/update", habitController.updateHabit);
router.delete("/remove/:id", habitController.removeHabit);

router.get("/progress", habitController.getAllProgress);
router.put("/progress/increment/", habitController.incrementProgress);


export default router;
