import { JsonDataBase, todoSchema } from "../types";
import { loggers } from "../utils/winston.util";
import { readData, writeData } from "./file.service"


export const findTodos = async (): Promise<todoSchema[] | []> => {
    try {
        const data: JsonDataBase = await readData();
        const { todos } = data;
        return todos;
    } catch (error) {
        loggers.error(error);
        throw Error(`Cant find todo due to ${error} `);
    }
}

export const findTodoById = async (id: string): Promise<todoSchema | null> => {
    try {
        const todos: todoSchema[] | [] = await findTodos();
        const todo: todoSchema | undefined = todos.find(item => item.id == id);
        if (todo) return todo;
        else return null
    } catch (error: any) {
        loggers.error(error);
        throw new Error(error.message)
    }
}

export const findTodosByUserId = async (userId: string): Promise<todoSchema[] | null> => {
    try {
        const todos: todoSchema[] | [] = await findTodos();
        const todo: todoSchema[] | [] = todos.filter(item => item.userId == userId);
        if (todo) return todo;
        else return null;
    } catch (error) {
        loggers.error(error);
        throw Error(`Cant find todo due to ${error} `);
    }
}

export const saveTodos = async (todos: todoSchema[] | []): Promise<boolean> => {
    try {
        const data: JsonDataBase = await readData();
        data.todos = todos;
        await writeData(data);
        return true;
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant save todo due to ${error} `);
    }
}

export const insertTodo = async (newTodo: todoSchema): Promise<boolean> => {
    try {
        const todos: todoSchema[] = await findTodos();
        todos.push(newTodo);
        await saveTodos(todos);
        return true;
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant insert todo due to ${error} `);
    }
}

export const updateTodoById = async (id: string, updateTodo: todoSchema): Promise<boolean> => {
    try {
        const todos: todoSchema[] | [] = await findTodos();
        const updateIndex = todos.findIndex(item => item.id == id);
        if (updateIndex == -1) return false
        else {
            todos[updateIndex] = updateTodo;
            await saveTodos(todos);
            return true;
        }
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant update todo due to ${error} `);
    }
}

export const deleteTodoById = async (id: string): Promise<boolean> => {
    try {
        const todos: todoSchema[] | [] = await findTodos();
        const deleteIndex = todos.findIndex(item => item.id == id);
        if (deleteIndex == -1) return false
        else {
            todos.splice(deleteIndex, 1);
            await saveTodos(todos);
            return true
        }
    } catch (error: any) {
        loggers.error(error);
        throw Error(error)
    }
}

export const deleteTodoByUserId = async (userId: string): Promise<boolean> => {
    try {
        const todos: todoSchema[] | [] = await findTodos();
        const updatedTodos: todoSchema[] | [] = todos.filter(item => item.userId !== userId);
        loggers.info(todos); loggers.info(updatedTodos);
        await saveTodos(updatedTodos);
        return true;
    } catch (error) {
        loggers.error(error);
        throw new Error('Error Happens while Deletion');
    }

}

export const deleteAllTodos = async (): Promise<boolean> => {
    try {
        const todos: any[] = [];
        await saveTodos(todos);
        return true;
    } catch (error) {
        loggers.error(error);
        throw new Error(`Cant delete todo due to ${error} `);
    }
}