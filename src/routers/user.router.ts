import { Router } from 'express';
import { createTodoController, readAllTodoController } from '../controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

export const router = Router();

// create todo
router.post('/create-todo', authMiddleware, createTodoController);

// read all todo
router.get('/read-all-todo',authMiddleware,readAllTodoController);
