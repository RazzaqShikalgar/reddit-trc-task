// services/comments-service/src/app.ts
import express from 'express';
import { json } from 'body-parser';
import commentRoutes from './routes/commentRoutes';
import swaggerUi from 'swagger-ui-express';
import { setupSwagger } from './swagger'; // Adjust based on your swagger setup

const app = express();
const PORT = process.env.PORT || 3003;

app.use(json());
app.use('/comments', commentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(setupSwagger));

app.listen(PORT, () => {
    console.log(`Comments service running on http://localhost:${PORT}`);
});
