import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import swaggerSetup from './swagger';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

swaggerSetup(app);

export default app;
