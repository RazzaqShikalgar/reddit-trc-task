// services/votes-service/src/routes/voteRoutes.ts

import { Router } from 'express';
import { createVote, getVotes, deleteVote } from '../controller/vote-controller';
import { verifyToken } from '../../../auth-service/src/middleware/auth-middleware'; // Ensure you have the token verification middleware

const router = Router();


/**
 * @swagger
 * /votes/create-vote:
 *   post:
 *     summary: Create a new vote
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *               type:
 *                 type: string
 *                 enum: [UP, DOWN]
 *     responses:
 *       '201':
 *         description: Vote created successfully
 *       '400':
 *         description: Bad request
 */
router.post('/create-vote', verifyToken, createVote); // Create vote

/**
 * @swagger
 * /votes/{postId}:
 *   get:
 *     summary: Get votes by post ID
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:    
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vote'
 */
router.get('/:postId', verifyToken, getVotes); // Get votes by post ID

/**
 * @swagger
 * /votes/{postId}:
 *   delete:
 *     summary: Delete a vote by post ID
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Successful response
 */
router.delete('/:postId', verifyToken, deleteVote); // Delete vote by post ID

export default router;
