import { Router } from 'express';
import { createTodoController } from '../controllers';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';

export const router = Router();

// create todo
router.post('/create-todo', jwtAuthMiddleware, createTodoController);