// services/auth-service/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../helper/authHelper';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt; // Get token from cookies

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const validToken = validateToken(token);
    console.log({ "this is valid data": validToken });
    if (validToken.success) {
        req.user = { id: validToken.data!.id }; // Attach user ID to req.user
        console.log({ "this is req.user": req.user });

        next();
    } else {
        res.status(401).json({ message: 'Invalid token' });
    }
};
