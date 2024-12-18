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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@redis/client");
const winston_util_1 = require("./winston.util");
const redisClient = (0, client_1.createClient)({
    url: 'redis://:your_secure_password@127.0.0.1:6379',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!redisClient.isOpen) {
        try {
            yield redisClient.connect();
            winston_util_1.loggers.info('Connected to Redis');
        }
        catch (err) {
            winston_util_1.loggers.error('Failed to connect to Redis:', err);
        }
    }
}))();
exports.default = redisClient;
