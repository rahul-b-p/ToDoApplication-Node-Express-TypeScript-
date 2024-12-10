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
exports.deleteTodosByUser = exports.deleteTodo = exports.updateTodo = exports.readTodosByUser = exports.readAllTodo = exports.createTodo = void 0;
const winston_util_1 = require("../utils/winston.util");
const config_1 = require("../config");
const services_1 = require("../services");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }
        const existingUser = yield (0, services_1.findUserById)(userId);
        if (!existingUser) {
            res.status(404).json({ messege: 'You are requested from an invalid user id' });
            return;
        }
        const { description, completed } = req.body;
        if (typeof description !== 'string' || typeof completed !== 'boolean') {
            res.status(400).json({ error: 'Invalid request body. Required fields: name (string), age (number), email (string).' });
            return;
        }
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
exports.createTodo = createTodo;
const readAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const todos = yield (0, services_1.findTodos)();
        res.status(200).json({ messege: 'Findout the list of all todos added in this application', body: todos });
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
});
exports.readAllTodo = readAllTodo;
const readTodosByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const todos = yield (0, services_1.findTodosByUserId)(userId);
        if (!todos) {
            res.status(404).json({ message: 'No todows added by the user' });
            return;
        }
        res.status(200).json({ messege: `Findout the  all todos added by ${existingUser.username}`, body: todos });
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
});
exports.readTodosByUser = readTodosByUser;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { description, completed } = req.body;
        if (typeof description !== 'string' || typeof completed !== 'boolean') {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }
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
        const existingTodo = yield (0, services_1.findTodoById)(id);
        if (!existingTodo) {
            res.status(404).json({ error: 'Not found any todo item with given id' });
            return;
        }
        if (existingTodo.userId !== userId) {
            res.status(401).json({ error: "You are unauthorized to update this todo" });
            return;
        }
        existingTodo.description = description;
        existingTodo.completed = completed;
        yield (0, services_1.updateTodoById)(id, existingTodo);
        res.statusMessage = 'Updated Successfully';
        res.status(200).json({ messege: 'todo item updated successfully', body: existingTodo });
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { id } = req.params;
        const existingTodo = yield (0, services_1.findTodoById)(id);
        if (existingTodo && existingTodo.userId !== userId) {
            res.status(401).json({ error: "You are unauthorized to delete this todo" });
            return;
        }
        const result = yield (0, services_1.deleteTodoById)(id);
        if (!result) {
            res.status(404).json({ messege: 'Not found any todo item with given id' });
            return;
        }
        res.statusMessage = "Deleted Successflly";
        res.status(200).json({ messege: 'Deleted todo with diven id' });
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
});
exports.deleteTodo = deleteTodo;
const deleteTodosByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield (0, services_1.deleteTodoByUserId)(userId);
        winston_util_1.loggers.info(result);
        if (!result) {
            res.status(404).json({ messege: 'Not found any todo item with given id' });
            return;
        }
        res.statusMessage = " Deleted Successfully";
        res.status(200).json({ messege: `Deleted all todos added by ${existingUser.username}` });
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
});
exports.deleteTodosByUser = deleteTodosByUser;
