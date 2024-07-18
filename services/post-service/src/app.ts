import express from 'express';
import postRoutes from './routes/postRoutes';
import setupSwagger from './swagger';

const app = express();

app.use(express.json());
app.use('/posts', postRoutes);

setupSwagger(app);

export default app;
