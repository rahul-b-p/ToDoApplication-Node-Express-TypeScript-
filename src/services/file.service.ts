import { readFileSync, writeFileSync } from 'fs';
import { loggers } from '../utils/winston.util';
import path from 'path';
import { JsonDataBase } from '../types/db.type';

export const dbFilePath = path.join(path.dirname(path.dirname(__dirname)), 'db.json');

export const readFile=()=>{
    return new Promise((resolve,reject)=>{
        try {
            const data = JSON.parse(readFileSync(dbFilePath,'utf-8'));
            loggers.info('Data Readed Successfully');
            resolve(data);
        } catch (error) {
            loggers.error(error);
            reject(new Error("Can't read the file"));
        }
    })
}

export const writeFile=(data:JsonDataBase)=>{
    return new Promise((resolve,reject)=>{
        try {
            writeFileSync(dbFilePath, JSON.stringify(data), 'utf-8');
            resolve(true);
        } catch (error) {
            reject(new Error("Can't write Into the File"));
        }
    })
}

writeFile({
    users:[{}],tokens:[{}], todos:[{}]
}).then((res) => {
    loggers.info(res);
}).catch((err) => {
    loggers.error(err)
});