import { JsonDataBase, todoSchema } from "../types";
import { loggers } from "../utils/winston.util";
import { readData, writeData } from "./file.service"


export const findTodos = async (): Promise<todoSchema[] | []> => {
    return new Promise<todoSchema[] | []>(async (resolve, reject) => {
        try {
            const data: JsonDataBase = await readData();
            const { todos } = data;
            resolve(todos);
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant find todo due to ${error} `) });
        }
    });
}

export const findTodoById = async (id: string): Promise<todoSchema> => {
    return new Promise<todoSchema>(async (resolve, reject) => {
        try {
            const todos: todoSchema[] | [] = await findTodos();
            const todo: todoSchema | undefined = todos.find(item => item.id == id);
            if (todo) resolve(todo);
            else reject({ status: 404, error: new Error(`Can't find todo with given ID`) });
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant find todo due to ${error} `) });
        }
    });
}

export const findTodosByUserId = async (userId: string): Promise<todoSchema[]> => {
    return new Promise<todoSchema[]>(async (resolve, reject) => {
        try {
            const todos: todoSchema[] | [] = await findTodos();
            const todo: todoSchema[] | [] = todos.filter(item => item.userId == userId);
            if (todo) resolve(todo);
            else reject({ status: 404, error: new Error(`Can't find todo with given ID`) });
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant find todo due to ${error} `) });
        }
    });
}

export const saveTodos = async (todos: todoSchema[] | []): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const data: JsonDataBase = await readData();
            data.todos = todos;
            await writeData(data);
            resolve(true);
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant save todo due to ${error} `) });
        }
    });
}

export const insertTodo = async (newTodo: todoSchema): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const todos: todoSchema[] = await findTodos();
            todos.push(newTodo);
            await saveTodos(todos);
            resolve(true);
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant insert todo due to ${error} `) });
        }
    });
}

export const updateTodoById = async (id: string, updateTodo: todoSchema): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const todos: todoSchema[] | [] = await findTodos();
            const updateIndex = todos.findIndex(item => item.id == id);
            if (updateIndex == -1) reject({ status: 404, error: new Error("Can't find a todo with given ID") });
            else {
                todos[updateIndex] = updateTodo;
                await saveTodos(todos);
                resolve(true);
            }
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant update todo due to ${error} `) });
        }
    });
}

export const deleteTodoById = async (id: string): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const todos: todoSchema[] | [] = await findTodos();
            const deleteIndex = todos.findIndex(item => item.id == id);
            if (deleteIndex == -1) reject({ status: 404, error: new Error("Can't find a todo with given ID") });
            else {
                todos.splice(deleteIndex, 1);
                await saveTodos(todos);
                resolve(true)
            }
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant delete todo due to ${error} `) });
        }
    });
}

export const deleteTodoByUserId = async (userId: string): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const todos: todoSchema[] | [] = await findTodos();
            const deleteIndex = todos.findIndex(item => item.userId == userId);
            if (deleteIndex == -1) reject({ status: 404, error: new Error("Can't find any todos in given Id") });
            else {
                const updatedTodos: todoSchema[] | [] = todos.filter(item => item.userId !== userId);
                await saveTodos(updatedTodos);
                resolve(true)
            }
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant delete todo due to ${error} `) });
        }
    });
}

export const deleteAllTodos = (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const todos: any[] = [];
            saveTodos(todos);
            resolve(true);
        } catch (error) {
            loggers.error(error);
            reject({ status: 500, error: new Error(`Cant delete todo due to ${error} `) });
        }
    });
}