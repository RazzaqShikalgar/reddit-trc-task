// services/comments-service/src/controller/commentController.ts
import { Request, Response } from 'express';
import { CommentService } from '../services/commentService';

const commentService = new CommentService();

export const createComment = async (req: Request, res: Response) => {
    const { text, postId, replyToId } = req.body;
    const authorId = (req.user && (req.user as { id: string })?.id) as string;
    if (!text || !postId) {
        return res.status(400).json({ error: 'Text and post ID are required.' });
    }

    try {
        const comment = await commentService.createComment(authorId, text, postId, replyToId);
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId, 10);

    try {
        const comments = await commentService.getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};
