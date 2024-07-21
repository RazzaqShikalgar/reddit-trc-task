// services/auth-service/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../helper/authHelper';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1] || (req.headers.cookie as string)?.match(/jwt=([^;]+)/)?.[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const validToken = validateToken(token);
    if (validToken.success) {
        req.user = { id: validToken.data!.id }; // Attach user ID to req.user

        next();
    } else {
        res.status(401).json({ message: 'Invalid token' });
    }
};
