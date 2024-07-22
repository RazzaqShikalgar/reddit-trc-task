// services/posts-service/src/app.ts
import express from 'express';
import { json } from 'body-parser';
import subScriptionRoute from './routes/subscriptionRoutes';
import { setupSwagger } from './swagger';
import cookieParser from 'cookie-parser';
import { connectRabbitMQ } from '../../rabbitmq/rabbitmq';
import { verifyToken } from '../../auth-service/src/middleware/auth-middleware';
const app = express();
const PORT = process.env.PORT || 3006;

app.use(json());
app.use('/subscriptions', subScriptionRoute);
app.use(cookieParser());
setupSwagger(app);
app.use(verifyToken);
connectRabbitMQ();
app.listen(PORT, () => {
    console.log(`Posts service running on http://localhost:${PORT}/api-docs`);
});
