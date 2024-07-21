// services/subreddits-service/src/app.ts
import express from 'express';
import subredditRoutes from './routes/subredditRoutes';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './swagger';
import { connectRabbitMQ } from '../../rabbitmq/rabbitmq';
import { verifyToken } from '../../auth-service/src/middleware/auth-middleware';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/subreddits', subredditRoutes);
app.use(cookieParser());
app.use(verifyToken);
connectRabbitMQ();
setupSwagger(app);
app.listen(PORT, () => {
    console.log(`Subreddits service running on http://localhost:${PORT}/api-docs`);
});
