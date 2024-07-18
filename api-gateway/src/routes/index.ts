import { Router } from 'express';
import axios from 'axios';

const router = Router();

const authServiceUrl = 'http://auth-service:5001';
const postServiceUrl = 'http://post-service:5002';
const userServiceUrl = 'http://user-service:5003';

/**
 * @swagger
 * /auth:
 *   get:
 *     description: Authenticate a user
 *     responses:
 *       200:
 *         description: Success
 */
router.use('/auth', async (req, res, next) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${authServiceUrl}${req.path}`,
            data: req.body,
            headers: req.headers,
        });
        res.status(response.status).json(response.data);
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    next();
});

/**
 * @swagger
 * /posts:
 *   get:
 *     description: Get posts
 *     responses:
 *       200:
 *         description: Success
 */
router.use('/posts', async (req, res, next) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${postServiceUrl}${req.path}`,
            data: req.body,
            headers: req.headers,
        });
        res.status(response.status).json(response.data);
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    next();
});

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get users
 *     responses:
 *       200:
 *         description: Success
 */
router.use('/users', async (req, res, next) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${userServiceUrl}${req.path}`,
            data: req.body,
            headers: req.headers,
        });
        res.status(response.status).json(response.data);
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    next();
});

export default router;
