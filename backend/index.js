import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import goalRoutes from './routes/goal.js';
import userRoutes from './routes/user.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 3008;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals/', goalRoutes);
app.use('/api/users/', userRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
