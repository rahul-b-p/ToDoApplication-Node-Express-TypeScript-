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
exports.logout = exports.login = exports.signup = void 0;
const config_1 = require("../config");
const services_1 = require("../services");
const winston_util_1 = require("../utils/winston.util");
const jwt_1 = require("../config/jwt");
const config_2 = require("../config");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).json({ error: 'Invalid Request Body' });
            return;
        }
        const existingUser = yield (0, services_1.findUserByMail)(email);
        if (existingUser) {
            res.status(409).json({ messege: "User Already Exists" });
        }
        else {
            const id = (0, config_1.generateId)();
            const hashPassword = yield (0, config_1.getEncryptedPassword)(password);
            const newUser = {
                id,
                username,
                email,
                hashPassword
            };
            yield (0, services_1.insertUser)(newUser);
            res.statusMessage = "Registered Successfully";
            res.status(200).json({ messege: "added new User", body: { username, email } });
        }
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).send(error);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).json({ error: 'Invalid ReqBody' });
            return;
        }
        const existingUser = yield (0, services_1.findUserByMail)(email);
        if (existingUser) {
            const isVerifiedPassword = yield (0, config_1.verifyPassword)(password, existingUser.hashPassword);
            if (isVerifiedPassword) {
                const accessToken = (0, jwt_1.getAccessToken)(existingUser.id);
                res.statusMessage = "Login Successfull";
                res.status(200).json({ auth: true, accessToken });
            }
            else {
                res.statusMessage = "Incorrect Password";
                res.status(400).json({ messege: "Entered Password is incorrect, please check again" });
            }
        }
        else {
            res.statusMessage = "User not Found";
            res.status(404).json({ messege: "No any existing user with given email, Please Sign up" });
        }
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).send(error);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (accessToken) {
            const isBlacklisted = yield (0, config_2.blackListToken)(accessToken);
            if (isBlacklisted) {
                res.statusMessage = "Logout Successfull";
                res.status(200).json({ message: 'Succsessfully completed your logout with invalidation of accesstoken' });
            }
            else {
                res.status(500).json({ message: 'Failed to blacklist token' });
            }
        }
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        res.status(500).send(error);
    }
});
exports.logout = logout;
