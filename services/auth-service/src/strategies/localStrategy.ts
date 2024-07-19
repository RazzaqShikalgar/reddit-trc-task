import { Strategy as LocalStrategy } from 'passport-local';
import { AuthService } from '../services/auth';
import { User } from '../models/User'; // Ensure you import the User model

export const localStrategy = new LocalStrategy(
    { usernameField: 'email' },
    async (email: string, password: string, done: (err: any, user?: User | false, info?: any) => void) => {
        const authService = new AuthService();

        try {
            // Validate user credentials
            const user = await authService.validateUser(email, password);

            if (!user) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            // If user is found, return the user object
            return done(null, user);
        } catch (error) {
            console.error('Error during authentication:', error);
            return done(error); // Pass the error to the done callback
        }
    }
);
