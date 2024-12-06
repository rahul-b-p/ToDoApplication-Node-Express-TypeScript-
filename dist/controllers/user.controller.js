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
exports.readAllUsersControlller = void 0;
const services_1 = require("../services");
const winston_util_1 = require("../utils/winston.util");
const readAllUsersControlller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            res.status(400).json({ error: 'You are requested from an invalid user id' });
            return;
        }
        const existingUser = yield (0, services_1.findUserById)(id);
        if (!existingUser) {
            res.status(400).json({ error: 'You are requested from an invalid user id' });
            return;
        }
        const users = yield (0, services_1.findUsers)();
        const responseBody = users.map(({ id, username, email }) => ({ id, username, email }));
        res.status(200).json({ message: 'Found the list of all users of the application', body: responseBody });
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.readAllUsersControlller = readAllUsersControlller;
