import express from 'express';
import dotenv from 'dotenv';
import goalRoutes from './routes/goal.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const port = process.env.PORT || 3008;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals/', goalRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
