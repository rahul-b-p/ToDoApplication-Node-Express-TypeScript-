"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.router = (0, express_1.Router)();
// signup
exports.router.post('/signup', controllers_1.signup);
// login
exports.router.post('/login', controllers_1.login);
// logout
exports.router.post('/logout', auth_middleware_1.authMiddleware, controllers_1.logout);
