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
exports.deleteTodoController = exports.updateTodoController = exports.readAllTodoController = exports.createTodoController = void 0;
const winston_util_1 = require("../utils/winston.util");
const config_1 = require("../config");
const services_1 = require("../services");
const createTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }
        const existingUser = yield (0, services_1.findUserById)(userId);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }
        const { description, completed } = req.body;
        const todoBody = {
            id: (0, config_1.generateId)(),
            userId,
            description,
            completed,
            timestamp: Date.now()
        };
        yield (0, services_1.insertTodo)(todoBody);
        res.statusMessage = "New todo added";
        res.status(200).json({
            messege: `New todo added by ${existingUser.username}`,
            body: {
                description,
                completed
            }
        });
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
});
exports.createTodoController = createTodoController;
const readAllTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.readAllTodoController = readAllTodoController;
const updateTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateTodoController = updateTodoController;
const deleteTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteTodoController = deleteTodoController;
