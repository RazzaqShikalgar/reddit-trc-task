// // services/auth-service/src/middleware/authMiddleware.ts
// import dotenv from 'dotenv';
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// dotenv.config({ path: '.env' });

// export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token || '', process.env.JWT_SECRET || "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu");
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };
