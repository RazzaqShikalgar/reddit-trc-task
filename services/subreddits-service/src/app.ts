// services/subreddits-service/src/app.ts
import express from 'express';
import { json } from 'body-parser';
import subredditRoutes from './routes/subredditRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger'; // Adjust based on your swagger setup

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use('/subreddits', subredditRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Subreddits service running on http://localhost:${PORT}`);
});
