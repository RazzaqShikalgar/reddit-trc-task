// services/subreddits-service/src/routes/subredditRoutes.ts
import { Router } from 'express';
import { createSubreddit, getAllSubreddits } from '../controller/subredditController';

const router = Router();

/**
 * @swagger
 * /subreddits:
 *   post:
 *     summary: Create a new subreddit
 *     tags: [Subreddits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subreddit created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createSubreddit);

/**
 * @swagger
 * /subreddits:
 *   get:
 *     summary: Get all subreddits
 *     tags: [Subreddits]
 *     responses:
 *       200:
 *         description: List of subreddits
 */
router.get('/', getAllSubreddits);

export default router;
