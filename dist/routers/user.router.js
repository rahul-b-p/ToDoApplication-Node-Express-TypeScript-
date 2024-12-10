"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.router = (0, express_1.Router)();
// read all users
exports.router.get('/read', auth_middleware_1.authMiddleware, controllers_1.readAllUsers);
// update user
exports.router.put('/update', auth_middleware_1.authMiddleware, controllers_1.updateUser);
// delete user
exports.router.delete('/delete', auth_middleware_1.authMiddleware, controllers_1.deleteUser);
// create todo
exports.router.post('/create-todo', auth_middleware_1.authMiddleware, controllers_1.createTodo);
// read all todos
exports.router.get('/read-all-todos', auth_middleware_1.authMiddleware, controllers_1.readAllTodo);
// read todos by user
exports.router.get('/read-todos', auth_middleware_1.authMiddleware, controllers_1.readTodosByUser);
// update todo
exports.router.put('/update-todo/:id', auth_middleware_1.authMiddleware, controllers_1.updateTodo);
// delete a todo
exports.router.delete('/delete-todo/:id', auth_middleware_1.authMiddleware, controllers_1.deleteTodo);
// delete todos by user
exports.router.delete('/delete-todos', auth_middleware_1.authMiddleware, controllers_1.deleteTodosByUser);
