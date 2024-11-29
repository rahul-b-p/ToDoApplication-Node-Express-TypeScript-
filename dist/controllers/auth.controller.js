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
exports.loginController = exports.signupController = void 0;
const config_1 = require("../config");
const services_1 = require("../services");
const winston_util_1 = require("../utils/winston.util");
const jwt_1 = require("../config/jwt");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
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
exports.signupController = signupController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
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
    }
});
exports.loginController = loginController;
