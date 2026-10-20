import express from "express";
import generateToken from '../utils/token_generator.js';
const router = express.Router();
import hashPassword from '../utils/hash_password.js';
import userExist from '../middlewares/user_exist_middleware.js';
import userAlreadyExist from "../middlewares/user_already_exist_middleware.js";
import AuthController from "../controllers/auth_controller.js";

router.use('/login', userExist);
router.use('/signup', userAlreadyExist);

router.post("/login", (req, res) => {
    const {email, password} = req.body;
var token = generateToken({email:email,password:password});
res.send({token:token})
});

router.post("/signup", async (req, res) => {
    const {email, password} = req.body;

var hashedPassword = await hashPassword(password);
let authController = new AuthController();
authController.createNewUser(email, hashedPassword);
res.send({msg:'new User added'});
});

export default router;
