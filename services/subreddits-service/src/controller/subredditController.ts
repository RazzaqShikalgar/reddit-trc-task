// services/subreddits-service/src/controller/subredditController.ts
import { Request, Response } from 'express';
import { SubredditService } from '../services/subredditServices';

const subredditService = new SubredditService();

export const createSubreddit = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Subreddit name is required.' });
    }

    try {
        const subreddit = await subredditService.createSubreddit(req.user.id, name);
        res.status(201).json(subreddit);
    } catch (error) {
        console.error('Error creating subreddit:', error);
        res.status(500).json({ error: 'Failed to create subreddit' });
    }
};

export const getAllSubreddits = async (req: Request, res: Response) => {
    try {
        const subreddits = await subredditService.getAllSubreddits();
        res.status(200).json(subreddits);
    } catch (error) {
        console.error('Error fetching subreddits:', error);
        res.status(500).json({ error: 'Failed to fetch subreddits' });
    }
};
