import { JsonDataBase, userSchema } from "../types";
import { loggers } from "../utils/winston.util";
import { readData, writeData } from "./file.service"


export const findUsers = async (): Promise<userSchema[] | []> => {
    try {
        const data: JsonDataBase = await readData();
        const { users } = data;
        return users;
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant find users due to ${error} `);
    }
}

export const findUserById = async (id: string): Promise<userSchema | null> => {
    try {
        const users: userSchema[] | [] = await findUsers();
        const user: userSchema | undefined = users.find(item => item.id == id);
        return user ? user : null;
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant find user due to ${error} `);
    }

}

export const findUserByMail = async (email: string): Promise<userSchema | null> => {
    try {
        const users: userSchema[] | [] = await findUsers();
        const user: userSchema | undefined = users.find(item => item.email == email);
        if (user) return user;
        else return null;
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant find user due to ${error} `);
    }
}

export const saveUsers = async (users: userSchema[] | []): Promise<boolean> => {
    try {
        const data: JsonDataBase = await readData();
        data.users = users;
        await writeData(data);
        return true;
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant save user due to ${error} `);
    }

}

export const insertUser = async (newTodo: userSchema): Promise<boolean> => {
    try {
        const users: userSchema[] = await findUsers();
        users.push(newTodo);
        await saveUsers(users);
        return true;
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant insert user due to ${error} `);
    }
}

export const updateUserById = async (id: string, updateTodo: userSchema): Promise<boolean> => {
    try {
        const users: userSchema[] | [] = await findUsers();
        const updateIndex = users.findIndex(item => item.id == id);
        if (updateIndex == -1) return false;
        else {
            users[updateIndex] = updateTodo;
            await saveUsers(users);
            return true;
        }
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant update user due to ${error} `);
    }
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