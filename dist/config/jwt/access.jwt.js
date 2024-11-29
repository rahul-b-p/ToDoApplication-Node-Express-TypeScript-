"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAccessToken = (id) => {
    const secretKey = process.env.ACCESS_TOKEN_SECERT;
    if (!secretKey) {
        throw new Error('Access token secret is not defined');
    }
    const accessToken = jsonwebtoken_1.default.sign({ id }, secretKey, { expiresIn: '7h' });
    return accessToken;
};
exports.getAccessToken = getAccessToken;
