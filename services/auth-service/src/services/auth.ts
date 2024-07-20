// services/auth-service/src/services/authService.ts

import { createUser, findUserByEmail, findUserById, registerUser } from '../db/auth_entity';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export class AuthService {
    async register(name: string, email: string, password: string, username: string): Promise<User> {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return await registerUser(name, email, hashedPassword, username);
    }

    async findUserById(id: string): Promise<User | null> {
        return await findUserById(id);
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await findUserByEmail(email);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password || '');
            if (isPasswordValid) {
                return user;
            }
        }
        return null;
    }

    async findOrCreateGoogleAccount(profile: any): Promise<User> {
        // Implement logic to find or create a user based on Google profile
        const { id, emails, displayName } = profile;
        const email = emails[0].value;

        let user = await findUserByEmail(email);
        if (!user) {
            user = {
                id: id,
                name: displayName,
                email: email,
                password: null, // Google account has no password
                emailVerified: new Date(), // Set email verified date to current date
                image: null, // Optional field
                username: email.split('@')[0], // Use email prefix as username
            };

            await createUser(user); // Create user in the database
        }

        return user; // Return the user
    }
}
