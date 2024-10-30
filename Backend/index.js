import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import cookieParser from 'cookie-parser';
import todoRouter from "./routes/todo.route.js"

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with frontend URL
    credentials: true,
}));

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.use('/api/user', userRouter);
app.use('/api/todo',todoRouter)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
