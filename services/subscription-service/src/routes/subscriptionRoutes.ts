// services/subscriptions-service/src/routes/subscriptionRoutes.ts

import { Router } from 'express';
import { createSubscription, getSubscriptions, deleteSubscription } from '../controller/subscription-controller';
import { verifyToken } from '../../../auth-service/src/middleware/auth-middleware'; // Ensure you have the token verification middleware

const router = Router();

/**
 * @swagger
 * /subscriptions/create-subscription:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subredditId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Subscription created successfully
 *       '400':
 *         description: Bad request
 */
router.post('/create-subscription', verifyToken, createSubscription); // Create subscription

/**
 * @swagger
 * /subscriptions/get-subscription:
 *   get:
 *     summary: Get subscriptions by user ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized
 */
router.get('/get-subscription', verifyToken, getSubscriptions); // Get subscriptions by user ID

/**
 * @swagger
 * /subscriptions/{subredditId}:
 *   delete:
 *     summary: Delete a subscription by subreddit ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subredditId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Successful response
 *       '400':
 *         description: Bad request
 */
router.delete('/:subredditId', verifyToken, deleteSubscription); // Delete subscription by subreddit ID

export default router;
