import { db, User } from '../models/User';
import { hashPassword, comparePassword } from '../utils/password';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const localAuth = async (email: string, password: string) => {
  const user = await db.select().from(User).where(User.email.eq(email)).single();
  if (!user) throw new Error('User not found');
  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error('Invalid password');
  return user;
};

export const googleAuth = async (tokenId: string) => {
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const user = await db.select().from(User).where(User.googleId.eq(payload.sub)).single();
  if (!user) {
    const newUser = await db.insert(User).values({
      email: payload.email,
      googleId: payload.sub,
      password: await hashPassword(Math.random().toString(36).slice(-8)), // Random password
    }).returning(User);
    return newUser;
  }
  return user;
};
