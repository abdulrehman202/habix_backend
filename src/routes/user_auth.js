import express from "express";
import generateToken from '../utils/token_generator.js';
const router = express.Router();

router.get("/login", (req, res) => {
var token = generateToken({email:req.body.email,password:req.body.password});
res.send({token:token})
});

router.get("/signup", (req, res) => {
var token = generateToken({email:req.body.email,password:req.body.password});
res.send({token:token})
});

export default router;
