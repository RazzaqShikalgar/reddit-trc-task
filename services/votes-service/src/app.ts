// services/posts-service/src/app.ts
import express from 'express';
import { json } from 'body-parser';
import voteRoutes from './routes/voteRoutes';
import { setupSwagger } from './swagger';
import cookieParser from 'cookie-parser';
import { verifyToken } from '../../auth-service/src/middleware/auth-middleware';
const app = express();
const PORT = process.env.PORT || 3005;

app.use(json());
app.use('/votes', voteRoutes);
app.use(cookieParser());
setupSwagger(app);
app.use(verifyToken);
app.listen(PORT, () => {
    console.log(`Posts service running on http://localhost:${PORT}/api-docs`);
});
