"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const winston_util_1 = require("../utils/winston.util");
const jwtAuthMiddleware = (req, res, next) => {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (accessToken) {
            const secretKey = process.env.ACCESS_TOKEN_SECERT;
            if (!secretKey) {
                throw new Error('Access token secret is not defined');
            }
            const jwtResponse = jsonwebtoken_1.default.verify(accessToken, secretKey);
            winston_util_1.loggers.info(jwtResponse);
        }
        else {
            res.status(400).json({ message: "No AccessToken Found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Authentication Failed", error });
    }
};
exports.jwtAuthMiddleware = jwtAuthMiddleware;
