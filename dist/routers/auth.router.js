"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
// signup
exports.router.post('/signup', controllers_1.signupController);
// login
exports.router.post('/login', controllers_1.loginController);
// logout
exports.router.post('/logout', controllers_1.logoutController);
