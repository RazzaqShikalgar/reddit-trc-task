import { Request, Response } from 'express';
import { db, User } from '../models/User';
import { createPastoToken, verifyPastoToken } from '../utils/pasto';
import { googleAuth, localAuth } from '../services/auth';
import { hashPassword, comparePassword } from '../utils/password';

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = await db.users.insert({ email, password: hashedPassword }).returning();
  const token = await createPastoToken({ userId: user.id });
  res.status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await localAuth(email, password);
  const token = await createPastoToken({ userId: user.id });
  res.status(200).json({ token });
};

export const googleLogin = async (req: Request, res: Response) => {
  const { tokenId } = req.body;
  const user = await googleAuth(tokenId);
  const token = await createPastoToken({ userId: user.id });
  res.status(200).json({ token });
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const userId = (await verifyPastoToken(req.headers.authorization!)).userId;
  const user = await db.users.findFirst({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const valid = await comparePassword(oldPassword, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid old password' });

  await db.users.update({ where: { id: userId }, data: { password: await hashPassword(newPassword) } });
  res.status(200).json({ message: 'Password changed successfully' });
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully' });
};