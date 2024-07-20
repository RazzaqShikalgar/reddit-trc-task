// services/posts-service/src/routes/postRoutes.ts
import { Router } from 'express';
import { createPost, getAllPosts, getPostById } from '../controller/postController';
import { verifyToken } from '../../../auth-service/src/middleware/auth-middleware'
const router = Router();

/**
 * @swagger
 * /posts/create-posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: object
 *               subredditId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create-posts', verifyToken, createPost);

/**
 * @swagger
 * /posts/get-all-posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get('/get-all-posts', getAllPosts);


router.get('get-post-by-id', getPostById);


export default router;
