// services/auth-service/src/routes/authRoutes.ts
import { Router } from 'express';
import { AuthService } from '../services/auth'; // Import AuthService
import passport from 'passport';
import { ne } from 'drizzle-orm';

const router = Router();
const authService = new AuthService();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', async (req, res) => {
    const { name, email, password, username } = req.body;

    // Validate input
    if (!name || !email || !password || !username) {
        return res.status(400).json({ error: 'Name, email, password, and username are required.' });
    }

    console.log('Registering user:', { name, email, username });

    try {
        const user = await authService.register(name, email, password, username);
        res.status(201).json(user); // Return the created user
    } catch (error) {
        console.error('Error during registration:', error);
        const errorMessage = (error instanceof Error) ? error.message : 'Registration failed';
        res.status(400).json({ error: errorMessage }); // Return error message
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', async (req, res, next) => {
    console.log('Login attempt:', req.body); // Log the incoming request body

    passport.authenticate('local', (err: any, user: Express.User | false, info: any) => {
        if (err) {
            console.error('Authentication error:', err);
            return next(err); // Handle error
        }
        console.log('Login User:', user);
        if (!user) {
            console.log('No user found:', info); // Log the info object for debugging
            return res.status(401).json({ message: 'Invalid credentials' }); // Invalid credentials
        }

        // Attempt to log in the user
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return next(err); // Handle error
            }
            console.log('User logged in:', user); // Log the user object
            return res.json({ user }); // Successful login
        });
    })(req, res, next);
});


/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Authenticate with Google
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect to Google for authentication
 */
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'], // Specify the scopes you need
}));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google authentication callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Authentication failed
 */
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }), // Redirect to login on failure
    (req, res) => {
        // Successful authentication, redirect to your desired route
        res.redirect('/dashboard'); // Change this to your desired route
    }
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post('/logout', (req, res, next) => {
    req.logout(next);
    res.status(200).json({ message: 'Logged out successfully' });
});

/**
 * @swagger
 * /auth/account:
 *   get:
 *     summary: Get account details
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Account details retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/account', (req, res) => {
    console.log('user data:', req.user);
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json(req.user); // Assuming user details are stored in req.user
});

/**
 * @swagger
 * /auth/verify-token:
 *   get:
 *     summary: Verify user token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Invalid token
 */
router.get('/verify-token', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(200).json({ message: 'Token is valid' });
});

/**
 * @swagger
 * /auth/ping:
 *   get:
 *     summary: Check server health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is up and running
 */
router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Pong' });
});

export default router;
