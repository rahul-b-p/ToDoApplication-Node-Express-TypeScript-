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
exports.writeData = exports.readData = exports.dbFilePath = void 0;
const promises_1 = require("fs/promises");
const winston_util_1 = require("../utils/winston.util");
const path_1 = __importDefault(require("path"));
exports.dbFilePath = path_1.default.join(path_1.default.dirname(path_1.default.dirname(__dirname)), 'db.json');
const readData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileContent = yield ((0, promises_1.readFile)(exports.dbFilePath, 'utf-8'));
        const data = JSON.parse(fileContent);
        winston_util_1.loggers.info('Data Readed Successfully');
        return data;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error("Can't read the file");
    }
});
exports.readData = readData;
const writeData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, promises_1.writeFile)(exports.dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
        winston_util_1.loggers.info('Data Written Successfully');
        return true;
    }
    catch (error) {
        winston_util_1.loggers.error(error);
        throw new Error("Can't write to the file");
    }
});
exports.writeData = writeData;
