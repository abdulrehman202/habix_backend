import 'dotenv/config';
import express from 'express';
const app = express();
import cors from 'cors';
import habitRouter from './src/routes/habit.js';

const PORT = process.env.PORT || 8000;

// Enable all CORS requests
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Middleware 2: This also always runs');

  //if(request not okay){
  // res.status(410).json({
  //   success: false,
  //   message: "User not found"
  // });}

  //else{
  next();
  //}

});

app.use("/habits", habitRouter);
app.use("/habits/add", habitRouter);
app.use("/habits/update", habitRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});