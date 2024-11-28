"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = exports.dbFilePath = void 0;
const fs_1 = require("fs");
const winston_util_1 = require("../utils/winston.util");
const path_1 = __importDefault(require("path"));
exports.dbFilePath = path_1.default.join(path_1.default.dirname(path_1.default.dirname(__dirname)), 'db.json');
const readFile = () => {
    return new Promise((resolve, reject) => {
        try {
            const data = JSON.parse((0, fs_1.readFileSync)(exports.dbFilePath, 'utf-8'));
            winston_util_1.loggers.info('Data Readed Successfully');
            resolve(data);
        }
        catch (error) {
            winston_util_1.loggers.error(error);
            reject(new Error("Can't read the file"));
        }
    });
};
exports.readFile = readFile;
const writeFile = (data) => {
    return new Promise((resolve, reject) => {
        try {
            (0, fs_1.writeFileSync)(exports.dbFilePath, JSON.stringify(data), 'utf-8');
            resolve(true);
        }
        catch (error) {
            reject(new Error("Can't write Into the File"));
        }
    });
};
exports.writeFile = writeFile;
(0, exports.writeFile)({
    users: [{}], tokens: [{}], todos: [{}]
}).then((res) => {
    winston_util_1.loggers.info(res);
}).catch((err) => {
    winston_util_1.loggers.error(err);
});