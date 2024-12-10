import { Router } from 'express';
import { createTodo, deleteTodo, deleteTodosByUser, deleteUser, readAllTodo, readTodosByUser, updateTodo, readAllUsers, updateUser } from '../controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

export const router = Router();

// read all users
router.get('/read', authMiddleware, readAllUsers);

// update user
router.put('/update', authMiddleware, updateUser);

// delete user
router.delete('/delete', authMiddleware, deleteUser);

// create todo
router.post('/create-todo', authMiddleware, createTodo);

// read all todos
router.get('/read-all-todos', authMiddleware, readAllTodo);

// read todos by user
router.get('/read-todos', authMiddleware, readTodosByUser);

// update todo
router.put('/update-todo/:id', authMiddleware, updateTodo);

// delete a todo
router.delete('/delete-todo/:id', authMiddleware, deleteTodo);

// delete todos by user
router.delete('/delete-todos', authMiddleware, deleteTodosByUser);
