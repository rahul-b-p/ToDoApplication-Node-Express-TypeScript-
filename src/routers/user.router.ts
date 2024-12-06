import { Router } from 'express';
import { createTodoController } from '../controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

export const router = Router();

// create todo
router.post('/create-todo', authMiddleware, createTodoController);