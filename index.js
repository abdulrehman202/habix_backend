import 'dotenv/config';
import express from 'express';
const app = express();
import cors from 'cors';
import habitRouter from './src/routes/habit.js';
import authRouter from './src/routes/user_auth.js';
import userProfileRouter from './src/routes/user_profile.js';
import devices from './src/routes/devices.js';
import schedule from './src/services/scheduleNotification.js';
import cron from'node-cron';

const PORT = process.env.PORT || 8000;

// Enable all CORS requests
app.use(cors());
app.use(express.json());


cron.schedule('50 16 * * *', async () => {
  schedule();
}, {
  timezone: 'Asia/Karachi' // Set your target timezone
});

app.use(devices);

app.use("/user", authRouter);
app.use("/user/login", authRouter);
app.use("/user/signup", authRouter);
app.use("/user/signout", authRouter);

app.use("/habits", habitRouter);
app.use("/habits/add", habitRouter);
app.use("/habits/progress", habitRouter);
app.use("/habits/progress/increment/", habitRouter);
app.use("/habits/progress/decrement/:id", habitRouter);
app.use("/habits/update", habitRouter);
app.use("/habits/remove/:id", habitRouter);

app.use("/userProfile", userProfileRouter);
app.use("/userProfile/set", userProfileRouter);
app.use("/userProfile/update", userProfileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});