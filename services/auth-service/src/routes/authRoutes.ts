import express, { Router } from 'express';
import authController from '../controllers/authController';

const router: Router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);
router.post('/change-password', authController.changePassword);
router.post('/logout', authController.logout);

export default router;