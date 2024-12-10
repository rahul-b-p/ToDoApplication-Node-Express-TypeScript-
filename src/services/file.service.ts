import { readFile, writeFile } from 'fs/promises';
import { loggers } from '../utils/winston.util';
import path from 'path';
import { JsonDataBase } from '../types';


export const dbFilePath = path.join(path.dirname(path.dirname(__dirname)), 'db.json');

export const readData = async (): Promise<JsonDataBase> => {
    try {
        const fileContent = await (readFile(dbFilePath, 'utf-8'));
        const data: JsonDataBase = JSON.parse(fileContent);
        loggers.info('Data Readed Successfully');
        return data;
    } catch (error) {
        loggers.error(error);
        throw new Error("Can't read the file");
    }
}

export const writeData = async (data: JsonDataBase): Promise<boolean> => {
    try {
        await writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
        loggers.info('Data Written Successfully');
        return true;
    } catch (error) {
        loggers.error(error);
        throw new Error("Can't write to the file")
    }
}