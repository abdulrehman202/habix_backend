import express from "express";
import generateToken from '../utils/token_generator.js';
const router = express.Router();
import hashPassword from '../utils/hash_password.js';
import userExist from '../middlewares/user_exist_middleware.js';

router.use('/login', userExist);

router.post("/login", (req, res) => {
    const {email, password} = req.body;
var token = generateToken({email:email,password:password});
res.send({token:token})
});

router.post("/signup", async (req, res) => {
var hashedPassword = await hashPassword(req.body.password);
res.send({hashed:hashedPassword})
});

export default router;
