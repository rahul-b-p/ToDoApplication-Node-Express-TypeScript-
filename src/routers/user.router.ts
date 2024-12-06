import { Router } from 'express';
import { createTodoController, deleteTodoController, readAllTodoController, readTodoByUserController, updateTodoController } from '../controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

export const router = Router();

// create todo
router.post('/create-todo', authMiddleware, createTodoController);

// read all todos
router.get('/read-all-todos', authMiddleware, readAllTodoController);

// read todos by user
router.get('/read-todos', authMiddleware, readTodoByUserController);

// update todo
router.put('/update-todo/:id', authMiddleware, updateTodoController);

// delete a todo
router.delete('/delete-todo/:id', authMiddleware, deleteTodoController);
