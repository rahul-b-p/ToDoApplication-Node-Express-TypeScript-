"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMutex = void 0;
const async_mutex_1 = require("async-mutex");
exports.fileMutex = new async_mutex_1.Mutex();
