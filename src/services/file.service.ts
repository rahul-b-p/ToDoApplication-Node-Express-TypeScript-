import { readFileSync, writeFileSync } from 'fs';
import { loggers } from '../utils/winston.util';
import path from 'path';
import { JsonDataBase } from '../types';


export const dbFilePath = path.join(path.dirname(path.dirname(__dirname)), 'db.json');

export const readData = (): Promise<JsonDataBase> => {
    return new Promise<JsonDataBase>((resolve, reject) => {
        try {
            const data: JsonDataBase = JSON.parse(readFileSync(dbFilePath, 'utf-8'));
            loggers.info('Data Readed Successfully');
            resolve(data);
        } catch (error) {
            loggers.error(error);
            reject(new Error("Can't read the file"));
        }
    });
}

export const writeData = (data: JsonDataBase): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        try {
            writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
            loggers.info('Data Written Successfully');
            resolve(true);
        } catch (error) {
            loggers.error(error);
            reject(new Error("Can't write Into the File"));
        }
    });
}