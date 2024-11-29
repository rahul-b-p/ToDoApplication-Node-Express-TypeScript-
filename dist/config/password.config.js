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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.getEncryptedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const getEncryptedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = bcrypt_1.default.genSaltSync(Number(process.env.SALT));
    const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
    return encryptedPassword;
});
exports.getEncryptedPassword = getEncryptedPassword;
const verifyPassword = (password, hashPass) => __awaiter(void 0, void 0, void 0, function* () {
    const isCorrectPassword = yield bcrypt_1.default.compare(password, hashPass);
    return isCorrectPassword;
});
exports.verifyPassword = verifyPassword;
