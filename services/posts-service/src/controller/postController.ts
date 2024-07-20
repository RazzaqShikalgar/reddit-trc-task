import { Request, Response } from 'express';
import { PostService } from '../service/postService';

// services/posts-service/src/controller/postController.ts

const postService = new PostService();

export const createPost = async (req: Request, res: Response) => {
    const { title, content, subredditId } = req.body;
    const id = (req.user && (req.user as { id: string })?.id) as string;
    if (!title || !content || !subredditId) {
        return res.status(400).json({ error: 'Title, content, and subreddit ID are required.' });
    }

    try {
        const post = await postService.createPost(id, title, content, subredditId);
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

export const getPostById = async (req: Request, res: Response) => {
    const { postId } = req.params;

    try {
        const post = await postService.getPostById(Number(postId));
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};
