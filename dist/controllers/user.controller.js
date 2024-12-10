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
exports.deleteUser = exports.updateUser = exports.readAllUsers = void 0;
const services_1 = require("../services");
const winston_util_1 = require("../utils/winston.util");
const config_1 = require("../config");
const token_config_1 = require("../config/token.config");
const readAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.readAllUsers = readAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { currentPassword, updatePassword, updateEmail, updateUsername } = req.body;
        if (typeof currentPassword !== 'string' || (typeof updatePassword !== 'string' && typeof updateEmail !== 'string' && typeof updateUsername !== 'string')) {
            res.status(400).json({ error: 'Invalid Request Body' });
            return;
        }
        const id = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }
        const existingUser = yield (0, services_1.findUserById)(id);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }
        const isVerifiedPassword = yield (0, config_1.verifyPassword)(currentPassword, existingUser.hashPassword);
        if (!isVerifiedPassword) {
            res.status(400).json({ messege: 'Entered Password is InCorrect, please check' });
            return;
        }
        const hashPassword = updatePassword ? yield (0, config_1.getEncryptedPassword)(updatePassword) : existingUser.hashPassword;
        const updatedUser = {
            id,
            username: updateUsername ? updateUsername : existingUser.username,
            email: updateEmail ? updateEmail : existingUser.email,
            hashPassword
        };
        yield (0, services_1.updateUserById)(id, updatedUser);
        res.statusMessage = "Updated Successfully";
        res.status(200).json({ messege: 'user updated successfully', body: { username: updatedUser.username, email: updatedUser.email } });
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }
        const existingUser = yield (0, services_1.findUserById)(id);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }
        const accessToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (accessToken) {
            const isBlacklisted = yield (0, token_config_1.blackListToken)(accessToken);
            if (isBlacklisted) {
                yield (0, services_1.deleteAccountById)(id);
                res.statusMessage = "Successfully Deleted";
                res.status(200).json({ message: 'Your Account has been removed successfully' });
            }
            else {
                res.status(500).json({ message: 'Account Deletion Failed Due to blacklisting your token' });
            }
        }
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.deleteUser = deleteUser;
