// services/posts-service/src/app.ts
import express from 'express';
import { json } from 'body-parser';
import postRoutes from './routes/postRoutes';
import swaggerUi from 'swagger-ui-express';
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(json());
app.use('/posts', postRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(setupSwagger));

app.listen(PORT, () => {
    console.log(`Posts service running on http://localhost:${PORT}`);
});
