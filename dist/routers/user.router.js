"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.router = (0, express_1.Router)();
// create todo
exports.router.post('/create-todo', auth_middleware_1.authMiddleware, controllers_1.createTodoController);
// read all todos
exports.router.get('/read-all-todos', auth_middleware_1.authMiddleware, controllers_1.readAllTodoController);
// read todos by user
exports.router.get('/read-todos', auth_middleware_1.authMiddleware, controllers_1.readTodoByUserController);
// update todo
exports.router.put('/update-todo', auth_middleware_1.authMiddleware, controllers_1.updateTodoController);
