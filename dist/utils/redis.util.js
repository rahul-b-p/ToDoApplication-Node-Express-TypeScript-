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
const redisClient = (0, client_1.createClient)();
redisClient.on('connect', () => {
    winston_util_1.loggers.info('Connected to Redis');
});
redisClient.on('error', (error) => {
    winston_util_1.loggers.error({ message: 'Redis Error', error });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
    }
    catch (error) {
        winston_util_1.loggers.error(`Reddis Connection Failed:${error}`);
    }
}))();
exports.default = redisClient;
