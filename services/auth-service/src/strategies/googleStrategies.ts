// src/strategies/googleStrategies.ts
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { AuthService } from '../services/auth';

dotenv.config({ path: ".env" });

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID ?? '',
    clientSecret: process.env.CLIENT_SECRET ?? '',
    callbackURL: '/oauth2/redirect/google',
  },
  async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
    const authService = new AuthService();
    try {
      const user = await authService.findOrCreateGoogleAccount(profile);
      console.log(user);
      done(null, user);
    } catch (error) {
      done(error, null); // Handle error appropriately
    }
  }
);