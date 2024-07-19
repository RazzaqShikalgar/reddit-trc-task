// services/auth-service/src/services/authService.ts
import { createUser, findUserByEmail, registerUser, validateUser, findOrCreateGoogleAccount } from '../../../db/entity'; // Import DB functions
import { User } from '../models/User'; // Adjust the import based on your project structure

export class AuthService {
  async register(name: string, email: string, password: string, username: string): Promise<User> {
    console.log('Registering user:', name, email);
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = await registerUser(name, email, password, username);
    return newUser; // Return the created user
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    return await validateUser(email, password); // Validate user credentials
  }

  async findOrCreateGoogleAccount(profile: any): Promise<User> {
    return await findOrCreateGoogleAccount(profile); // Find or create user from Google profile
  }
}
