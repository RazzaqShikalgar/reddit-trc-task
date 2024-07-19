// services/comments-service/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next(); // Proceed to the next middleware or route handler
    }
    return res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated
};
