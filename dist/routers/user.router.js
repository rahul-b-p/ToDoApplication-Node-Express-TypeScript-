"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const controllers_2 = require("../controllers");
exports.router = (0, express_1.Router)();
// read all users
exports.router.get('/read', auth_middleware_1.authMiddleware, controllers_2.readAllUsersControlller);
// update user
exports.router.put('/update', auth_middleware_1.authMiddleware, controllers_2.updateUserConroller);
// delete user
exports.router.delete('/delete', auth_middleware_1.authMiddleware, controllers_1.deleteUserController);
// create todo
exports.router.post('/create-todo', auth_middleware_1.authMiddleware, controllers_1.createTodoController);
// read all todos
exports.router.get('/read-all-todos', auth_middleware_1.authMiddleware, controllers_1.readAllTodoController);
// read todos by user
exports.router.get('/read-todos', auth_middleware_1.authMiddleware, controllers_1.readTodosByUserController);
// update todo
exports.router.put('/update-todo/:id', auth_middleware_1.authMiddleware, controllers_1.updateTodoController);
// delete a todo
exports.router.delete('/delete-todo/:id', auth_middleware_1.authMiddleware, controllers_1.deleteTodoController);
// delete todos by user
exports.router.delete('/delete-todos', auth_middleware_1.authMiddleware, controllers_1.deleteTodosByUser);
