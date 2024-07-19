// services/posts-service/src/controller/postController.ts
import { Request, Response } from 'express';
import { PostService } from '../service/postService';

const postService = new PostService();

export const createPost = async (req: Request, res: Response) => {
    const { title, content, subredditId } = req.body;

    if (!title || !content || !subredditId) {
        return res.status(400).json({ error: 'Title, content, and subreddit ID are required.' });
    }

    try {//TODO error resolve post-service
        const post = await postService.createPost(req.user.id, title, content, subredditId);
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};
