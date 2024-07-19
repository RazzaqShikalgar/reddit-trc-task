// services/comments-service/src/routes/commentRoutes.ts
import { Router } from 'express';
import { createComment, getCommentsByPostId } from '../controllers/commentController';
import { isAuthenticated } from '../../../auth-service/src/middleware/auth-middleware';
const router = Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               postId:
 *                 type: integer
 *               replyToId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', isAuthenticated, createComment);

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Get comments for a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments
 *       404:
 *         description: Post not found
 */
router.get('/:postId', getCommentsByPostId);

export default router;
