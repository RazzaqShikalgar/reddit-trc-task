// services/auth-service/src/helpers/authHelper.ts

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const validateToken = (token: string): {
    success: boolean; data?: {
        id: string
    }; error?: string
} => {
    try {
        if (!token) {
            throw new Error("Access Denied. No JWT found in cookie");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string
        };
        console.log({ "This is decoded": decoded });
        if (decoded) {
            return { success: true, data: { id: decoded.id } }; // Return the user ID
        } else {
            throw new Error("Access Denied. Reason: JWT not valid");
        }
    } catch (err) {
        return { success: false, error: (err as Error).message }; // Return error message
    }
};
