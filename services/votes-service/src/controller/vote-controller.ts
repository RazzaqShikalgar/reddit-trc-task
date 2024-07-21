// services/votes-service/src/controller/voteController.ts

import { Request, Response } from 'express';
import { VoteService } from '../service/vote-service';

const voteService = new VoteService();

export const createVote = async (req: Request, res: Response) => {
    const { postId, type } = req.body;
    const authorId = (req.user as { id: string })?.id;

    if (!authorId || !postId || !type) {
        return res.status(400).json({ error: 'Author ID, post ID, and vote type are required.' });
    }

    try {
        await voteService.create(authorId, postId, type);
        res.status(201).json({ message: 'Vote created successfully.' });
    } catch (error) {
        console.error('Error creating vote:', error);
        res.status(500).json({ error: 'Failed to create vote.' });
    }
};

export const getVotes = async (req: Request, res: Response) => {
    const { postId } = req.params; // Assuming postId is passed as a URL parameter

    try {
        const votes = await voteService.getByPostId(parseInt(postId));
        res.status(200).json(votes);
    } catch (error) {
        console.error('Error fetching votes:', error);
        res.status(500).json({ error: 'Failed to fetch votes.' });
    }
};

export const deleteVote = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const authorId = (req.user as { id: string })?.id;

    if (!authorId || !postId) {
        return res.status(400).json({ error: 'Author ID and post ID are required.' });
    }

    try {
        await voteService.remove(authorId, parseInt(postId));
        res.status(204).json();
    } catch (error) {
        console.error('Error deleting vote:', error);
        res.status(500).json({ error: 'Failed to delete vote.' });
    }
};
