import {Router} from 'express';
import { login, logout, signup } from '../controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

export const router = Router();

// signup
router.post('/signup',signup);

// login
router.post('/login',login);

// logout
router.post('/logout',authMiddleware,logout);

