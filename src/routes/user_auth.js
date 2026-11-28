import express from "express";
const router = express.Router();
import checkCredentials from '../middlewares/check_credentials.js';
import userAlreadyExist from "../middlewares/user_already_exist_middleware.js";
import authController from "../controllers/auth_controller.js";

router.use('/login', checkCredentials);
router.use('/signup', userAlreadyExist);

router.get('/verify/', authController.verifyEmail);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/signup", authController.signUp);
router.put("/signout", authController.signout);

export default router;
