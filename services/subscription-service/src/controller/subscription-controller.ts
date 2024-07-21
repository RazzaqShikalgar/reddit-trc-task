// services/subscriptions-service/src/controller/subscriptionController.ts

import { Request, Response } from 'express';
import { SubscriptionService } from '../service/subscription-service';

const subscriptionService = new SubscriptionService();

export const createSubscription = async (req: Request, res: Response) => {
    const { subredditId } = req.body;
    const userId = (req.user as { id?: string })?.id; // Assuming user ID is set in the request

    if (!userId || !subredditId) {
        return res.status(400).json({ error: 'User ID and subreddit ID are required.' });
    }

    try {
        await subscriptionService.create(userId, subredditId);
        res.status(201).json({ message: 'Subscription created successfully.' });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ error: 'Failed to create subscription.' });
    }
};

export const getSubscriptions = async (req: Request, res: Response) => {
    const userId = (req.user as { id?: string })?.id; // Assuming user ID is set in the request

    if (!userId) {
        return res.status(401).json({ error: 'User ID is required.' });
    }

    try {
        const subscriptions = await subscriptionService.getByUserId(userId);
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ error: 'Failed to fetch subscriptions.' });
    }
};

export const deleteSubscription = async (req: Request, res: Response) => {
    const { subredditId } = req.params; // Assuming subredditId is passed as a URL parameter
    const userId = (req.user as { id?: string })?.id; // Assuming user ID is set in the request
    if (!userId || !subredditId) {
        return res.status(400).json({ error: 'User ID and subreddit ID are required.' });
    }

    try {
        await subscriptionService.remove(userId, parseInt(subredditId));
        res.status(204).json(); // No content
    } catch (error) {
        console.error('Error deleting subscription:', error);
        res.status(500).json({ error: 'Failed to delete subscription.' });
    }
};
