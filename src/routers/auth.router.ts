import {Router} from 'express';
import { loginController, logoutController, signupController } from '../controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

export const router = Router();

// signup
router.post('/signup',signupController);

// login
router.post('/login',loginController);

// logout
router.post('/logout',authMiddleware,logoutController);

