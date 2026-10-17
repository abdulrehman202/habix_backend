import 'dotenv/config';
import express from 'express';
const app = express();
import cors from 'cors';
import habitRouter from './src/routes/habit.js';
import authRouter from './src/routes/user_auth.js';

const PORT = process.env.PORT || 8000;

// Enable all CORS requests
app.use(cors());
app.use(express.json());

app.use("/user", authRouter);
app.use("/user/login", authRouter);
app.use("/user/signup", authRouter);

app.use("/habits", habitRouter);
app.use("/habits/add", habitRouter);
app.use("/habits/update", habitRouter);
app.use("/habits/remove/:id", habitRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});