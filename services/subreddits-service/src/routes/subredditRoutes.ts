// services/subreddits-service/src/routes/subredditRoutes.ts
import { Router } from 'express';
import { createSubreddit, getAllSubreddits } from '../controller/subredditController';
import { verifyToken } from '../../../auth-service/src/middleware/auth-middleware';

const router = Router();

/**
 * @swagger
 * /subreddits/create-subreddits:
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
router.post('/create-subreddits', verifyToken, createSubreddit);

/**
 * @swagger
 * /subreddits/subreddits:
 *   get:
 *     summary: Get all subreddits
 *     tags: [Subreddits]
 *     responses:
 *       200:
 *         description: List of subreddits
 */
router.get('/subreddits', getAllSubreddits);

export default router;
