import { JsonDataBase, userSchema } from "../types";
import { loggers } from "../utils/winston.util";
import { readData, writeData } from "./file.service"


export const findUsers = async (): Promise<userSchema[] | []> => {
    return new Promise<userSchema[] | []>(async (resolve, reject) => {
        try {
            const data: JsonDataBase = await readData();
            const { users } = data;
            resolve(users);
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant find users due to ${error} `) });
        }
    });
}

export const findUserById = async (id: string): Promise<userSchema | null> => {
    return new Promise<userSchema | null>(async (resolve, reject) => {
        try {
            const users: userSchema[] | [] = await findUsers();
            const user: userSchema | undefined = users.find(item => item.id == id);
            resolve(user ? user : null)
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant find user due to ${error} `) });
        }
    });
}

export const findUserByMail = async (email: string): Promise<userSchema | null> => {
    return new Promise(async (resolve, reject) => {
        try {
            const users: userSchema[] | [] = await findUsers();
            const user: userSchema | undefined = users.find(item => item.email == email);
            if (user) resolve(user);
            else resolve(null);
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant find user due to ${error} `) });
        }
    })
}

export const saveUsers = async (users: userSchema[] | []): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const data: JsonDataBase = await readData();
            data.users = users;
            await writeData(data);
            resolve(true);
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant save user due to ${error} `) });
        }
    });
}

export const insertUser = async (newTodo: userSchema): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const users: userSchema[] = await findUsers();
            users.push(newTodo);
            await saveUsers(users);
            resolve(true);
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant insert user due to ${error} `) });
        }
    });
}

export const updateUserById = async (id: string, updateTodo: userSchema): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const users: userSchema[] | [] = await findUsers();
            const updateIndex = users.findIndex(item => item.id == id);
            if (updateIndex == -1) reject({ status: 404, error: new Error("Can't find a user with given ID") });
            else {
                users[updateIndex] = updateTodo;
                await saveUsers(users);
                resolve(true);
            }
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant update user due to ${error} `) });
        }
    });
}

export const deleteUserById = async (id: string): Promise<boolean> => {
    try {
        const users: userSchema[] | [] = await findUsers();
        const deleteIndex = users.findIndex(item => item.id == id);
        if (deleteIndex == -1) throw new Error('Not find given user for Delete');
        else {
            users.splice(deleteIndex, 1);
            await saveUsers(users);
            return true;
        }
    } catch (error) {
        loggers.error(error);
        throw new Error('User Deletion Failed');
    }
}