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
exports.deleteAllTodos = exports.deleteTodoByUserId = exports.deleteTodoById = exports.updateTodoById = exports.insertTodo = exports.saveTodos = exports.findTodosByUserId = exports.findTodoById = exports.findTodos = void 0;
const winston_util_1 = require("../utils/winston.util");
const file_service_1 = require("./file.service");
const findTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, file_service_1.readData)();
        const { todos } = data;
        return todos;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw Error(`Cant find todo due to ${error} `);
    }
});
exports.findTodos = findTodos;
const findTodoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, exports.findTodos)();
        const todo = todos.find(item => item.id == id);
        if (todo)
            return todo;
        else
            return null;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(error.message);
    }
});
exports.findTodoById = findTodoById;
const findTodosByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, exports.findTodos)();
        const todo = todos.filter(item => item.userId == userId);
        if (todo)
            return todo;
        else
            return null;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw Error(`Cant find todo due to ${error} `);
    }
});
exports.findTodosByUserId = findTodosByUserId;
const saveTodos = (todos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, file_service_1.readData)();
        data.todos = todos;
        yield (0, file_service_1.writeData)(data);
        return true;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant save todo due to ${error} `);
    }
});
exports.saveTodos = saveTodos;
const insertTodo = (newTodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, exports.findTodos)();
        todos.push(newTodo);
        yield (0, exports.saveTodos)(todos);
        return true;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant insert todo due to ${error} `);
    }
});
exports.insertTodo = insertTodo;
const updateTodoById = (id, updateTodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, exports.findTodos)();
        const updateIndex = todos.findIndex(item => item.id == id);
        if (updateIndex == -1)
            return false;
        else {
            todos[updateIndex] = updateTodo;
            yield (0, exports.saveTodos)(todos);
            return true;
        }
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant update todo due to ${error} `);
    }
});
exports.updateTodoById = updateTodoById;
const deleteTodoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, exports.findTodos)();
        const deleteIndex = todos.findIndex(item => item.id == id);
        if (deleteIndex == -1)
            return false;
        else {
            todos.splice(deleteIndex, 1);
            yield (0, exports.saveTodos)(todos);
            return true;
        }
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw Error(error);
    }
});
exports.deleteTodoById = deleteTodoById;
const deleteTodoByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, exports.findTodos)();
        const updatedTodos = todos.filter(item => item.userId !== userId);
        winston_util_1.loggers.info(todos);
        winston_util_1.loggers.info(updatedTodos);
        yield (0, exports.saveTodos)(updatedTodos);
        return true;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error('Error Happens while Deletion');
    }
});
exports.deleteTodoByUserId = deleteTodoByUserId;
const deleteAllTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = [];
        yield (0, exports.saveTodos)(todos);
        return true;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant delete todo due to ${error} `);
    }
});
exports.deleteAllTodos = deleteAllTodos;
