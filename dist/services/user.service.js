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
exports.deleteUserById = exports.updateUserById = exports.insertUser = exports.saveUsers = exports.findUserByMail = exports.findUserById = exports.findUsers = void 0;
const winston_util_1 = require("../utils/winston.util");
const file_service_1 = require("./file.service");
const findUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, file_service_1.readData)();
        const { users } = data;
        return users;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant find users due to ${error} `);
    }
});
exports.findUsers = findUsers;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, exports.findUsers)();
        const user = users.find(item => item.id == id);
        return user ? user : null;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant find user due to ${error} `);
    }
});
exports.findUserById = findUserById;
const findUserByMail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, exports.findUsers)();
        const user = users.find(item => item.email == email);
        if (user)
            return user;
        else
            return null;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant find user due to ${error} `);
    }
});
exports.findUserByMail = findUserByMail;
const saveUsers = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, file_service_1.readData)();
        data.users = users;
        yield (0, file_service_1.writeData)(data);
        return true;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant save user due to ${error} `);
    }
});
exports.saveUsers = saveUsers;
const insertUser = (newTodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, exports.findUsers)();
        users.push(newTodo);
        yield (0, exports.saveUsers)(users);
        return true;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant insert user due to ${error} `);
    }
});
exports.insertUser = insertUser;
const updateUserById = (id, updateTodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, exports.findUsers)();
        const updateIndex = users.findIndex(item => item.id == id);
        if (updateIndex == -1)
            return false;
        else {
            users[updateIndex] = updateTodo;
            yield (0, exports.saveUsers)(users);
            return true;
        }
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error(`Cant update user due to ${error} `);
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, exports.findUsers)();
        const deleteIndex = users.findIndex(item => item.id == id);
        if (deleteIndex == -1)
            throw new Error('Not find given user for Delete');
        else {
            users.splice(deleteIndex, 1);
            yield (0, exports.saveUsers)(users);
            return true;
        }
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error('User Deletion Failed');
    }
});
exports.deleteUserById = deleteUserById;
