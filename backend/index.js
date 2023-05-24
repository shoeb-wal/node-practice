import express from 'express';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 4000

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}))

app.use("/api/users", userRoutes);
app.get('/', (req, res) => { res.send('server is listening')})

app.use(notFound);
app.use(errorHandler);

app.listen(port,() => console.log(`server listening on port ${port}`));