import express from 'express';
import router from './routes/index'; // Adjust the path to your router file
import { setupSwagger } from './swagger'; // Adjust the path

const app = express();

app.use(express.json()); // Parse JSON request bodies

// Use the router defined in your provided code
app.use(router);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);

});
