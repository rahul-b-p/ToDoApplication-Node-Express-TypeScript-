"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtRemainsTime = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const winston_util_1 = require("../../utils/winston.util");
const getJwtRemainsTime = (token) => {
    try {
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error('Access token secret is not defined');
        }
        const { exp } = jsonwebtoken_1.default.verify(token, secretKey);
        const JwtremainsTime = exp - Math.floor(Date.now() / 1000);
        return JwtremainsTime;
    }
    catch (error) {
        winston_util_1.loggers.info(error);
    }
};
exports.getJwtRemainsTime = getJwtRemainsTime;
