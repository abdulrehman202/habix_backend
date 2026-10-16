import express from "express";
import verifyToken from '../middlewares/token_middlewares.js';
const router = express.Router();

router.use("/login", verifyToken);

router.get("/login", (req, res) => {
res.send({result:'OK'})
});

export default router;
