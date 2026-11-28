import userProfileController from '../controllers/user_profile_controller.js';
import express from "express";
const router = express.Router();
import verifyToken from '../middlewares/verify_token_middleware.js';

router.use(verifyToken);

router.get("/", userProfileController.getProfile);
router.post("/set", userProfileController.setProfile);
router.put("/update", userProfileController.updateProfile);

export default router;
