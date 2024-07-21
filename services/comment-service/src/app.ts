// services/comments-service/src/app.ts
import express from 'express';
import commentRoutes from './routes/commentRoutes';
import { setupSwagger } from './swagger'; // Adjust based on your swagger setup
import { verifyToken } from '../../auth-service/src/middleware/auth-middleware';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cookieParser());
app.use('/comments', commentRoutes);
app.use(verifyToken);
setupSwagger(app);
app.listen(PORT, () => {
    console.log(`Comments service running on http://localhost:${PORT}/api-docs`);
});
