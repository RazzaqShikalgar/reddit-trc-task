import { Request, Response } from 'express';
import { Post } from '../models/Post';

export const createPost = async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;
  const post = await Post.create({ title, content, userId });
  res.status(201).json(post);
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.status(200).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await Post.update(id, { title, content });
  res.status(200).json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Post.delete(id);
  res.status(204).send();
};
