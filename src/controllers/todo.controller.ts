import { Request, Response } from "express";
import { loggers } from "../utils/winston.util";
import { customRequest, todoReqBody, todoSchema, userSchema, } from "../types";
import { generateId } from "../config";
import { findTodos, findUserById, insertTodo } from "../services";



export const createTodoController = async (req: customRequest<{}, any, todoReqBody>, res: Response) => {
    try {
        const userId: string | undefined = req.payload?.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | undefined = await findUserById(userId);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const { description, completed } = req.body
        const todoBody: todoSchema = {
            id: generateId(),
            userId,
            description,
            completed,
            timestamp: Date.now()
        };

        await insertTodo(todoBody);
        res.statusMessage = "New todo added";
        res.status(200).json({
            messege: `New todo added by ${existingUser.username}`,
            body: {
                description,
                completed
            }
        });

    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}


export const readAllTodoController = async (req: customRequest, res: Response) => {
    try {
        const userId: string | undefined = req.payload?.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | undefined = await findUserById(userId);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const todos = await findTodos();
        res.status(200).json({ messege: 'Findout the list of all todos added in this application', body: todos })
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error })
    }
}

export const readAllTodoByUserController = async (req: customRequest, res: Response) => {
    
}


export const updateTodoController = async (req: Request, res: Response) => {

}

export const deleteTodoController = async (req: Request, res: Response) => {

}