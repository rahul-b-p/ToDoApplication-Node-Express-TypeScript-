"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.authRouter = void 0;
var auth_router_1 = require("./auth.router");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_router_1.router; } });
var user_router_1 = require("./user.router");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_router_1.router; } });
