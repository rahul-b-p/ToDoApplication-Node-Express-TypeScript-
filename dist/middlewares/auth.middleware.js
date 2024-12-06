"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const winston_util_1 = require("../utils/winston.util");
function isJwtPayload(payload) {
    return typeof payload !== 'string' && payload !== null;
}
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        if (!secretKey) {
            res.status(500).json({ error: 'Secret key not configured' });
            return;
        }
        const jwtResponse = jsonwebtoken_1.default.verify(accessToken, secretKey);
        if (isJwtPayload(jwtResponse) && jwtResponse.id) {
            req.payload = { id: jwtResponse.id };
            next();
        }
        else {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
    catch (error) {
        winston_util_1.loggers.error('Authentication error', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
});
exports.authMiddleware = authMiddleware;
