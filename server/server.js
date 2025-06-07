import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from "./routes/imageRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
await connectDB(); 

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

// app.get('/', (req, res) => res.send("Hello from the updated API at " 
//   + new Date().toLocaleTimeString()));

app.get('/', (req, res) => res.send("API running successfully"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// http://localhost:3000/api/user/register
// http://localhost:3000/api/user/login