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
exports.deleteAccountById = void 0;
const winston_util_1 = require("../utils/winston.util");
const file_service_1 = require("./file.service");
const todo_service_1 = require("./todo.service");
const user_service_1 = require("./user.service");
const deleteAccountById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.findUsers)();
        const userDeleteIndex = users.findIndex(item => item.id == id);
        if (userDeleteIndex !== -1) {
            users.splice(userDeleteIndex, 1);
            const todos = yield (0, todo_service_1.findTodos)();
            const updatedTodos = todos.filter(item => item.userId !== id);
            const data = yield (0, file_service_1.readData)();
            data.todos = updatedTodos;
            data.users = users;
            yield (0, file_service_1.writeData)(data);
            true;
        }
        return false;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error("Can't Delete Account due to an error");
    }
});
exports.deleteAccountById = deleteAccountById;
