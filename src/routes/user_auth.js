import express from "express";
import {generateToken, generateRefreshToken} from '../utils/token_generator.js';
const router = express.Router();
import hashPassword from '../utils/hash_password.js';
import userExist from '../middlewares/user_exist_middleware.js';
import userAlreadyExist from "../middlewares/user_already_exist_middleware.js";
import AuthController from "../controllers/auth_controller.js";
import verificationEvents from '../utils/verification_event.js';

router.use('/login', userExist);
router.use('/signup', userAlreadyExist);

router.get('/verify/', (req, res) => {
  try {
    const found = verificationEvents.emit(req.query.token);
  if (!found) return res.status(400).send('Link expired or already used.');
  res.send('Email verified! You can return to the app.');
  } catch (err) {
    res.status(400).send('Invalid or expired token.');
  }
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;
var token = generateToken({email:email,password:password});
var refreshToken = generateRefreshToken({email:email,password:password});
res.send({token:token,refreshToken:refreshToken})
});

router.post("/signup", async (req, res) => {
    const {email, password} = req.body;

var hashedPassword = await hashPassword(password);
let authController = new AuthController();
authController.createNewUser(email, hashedPassword);
res.send({msg:'new User added'});
});

router.put("/signout", async (req, res) => {
    let authController = new AuthController();
authController.signout(req.headers['authorization']);
res.send({success:true});
});

export default router;
