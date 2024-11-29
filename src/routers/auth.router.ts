import {Router} from 'express';
import { loginController, signupController } from '../controllers';

export const router = Router();

// signup
router.post('/signup',signupController);

// login
router.post('/login',loginController);

