// import { Router } from 'express';
// import { AuthService } from '../services/auth';
// import passport from 'passport';

// const router = Router();
// const authService = new AuthService();

// // Route for user registration
// router.post('/register', async (req, res) => {
//   const { name, email, password, userName } = req.body;
//   console.log('Registering in controller:', name, email);
//   try {
//     const user = await authService.register(name, email, password, userName);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: (error as Error).message });
//   }
// });

// // Route for user login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log({ email, password });

//   const user = await authService.validateUser(email, password);
//   if (user) {
//     res.json(user); // User object after successful authentication
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// // Route for Google OAuth login
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Google OAuth callback route
// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect home or send user info
//     res.redirect('/'); // Adjust this to your application's needs
//   }
// );

// // Optional: Route to get the current authenticated user
// router.get('/me', (req, res) => {
//   if (req.user) {
//     res.json(req.user); // Return the authenticated user's info
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// });

// // Optional: Route for logging out
// router.post('/logout', (req, res, next) => {
//   req.logout(next); // Passport's logout method
//   res.status(200).json({ message: 'Logged out successfully' });
// });

// export default router;