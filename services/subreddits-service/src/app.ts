// services/subreddits-service/src/app.ts
import express from 'express';
import subredditRoutes from './routes/subredditRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger'; // Adjust based on your swagger setup
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/subreddits', subredditRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser());
app.listen(PORT, () => {
    console.log(`Subreddits service running on http://localhost:${PORT}`);
});
