import express from "express"
import cookieParser from "cookie-parser"
import mongoose from 'mongoose';
import cors from 'cors'
import authRoutes from "./routes/authRoute"
import userRoutes from "./routes/userRoute"

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000', // Specify the exact origin of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
)


mongoose.connect('mongodb://localhost:27017/webdevhack01'); 

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});