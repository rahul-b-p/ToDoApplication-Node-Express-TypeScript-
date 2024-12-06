"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.router = (0, express_1.Router)();
// create todo
exports.router.post('/create-todo', auth_middleware_1.authMiddleware, controllers_1.createTodoController);
// read all todo
exports.router.get('/read-all-todo', auth_middleware_1.authMiddleware, controllers_1.readAllTodoController);
