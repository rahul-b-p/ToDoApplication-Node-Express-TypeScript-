import { Response } from "express";
import { loggers } from "../utils/winston.util";
import { customRequest, todoReqBody, todoSchema, updateTodoReqBody, userSchema, } from "../types";
import { generateId } from "../config";
import { findTodosByUserId, findTodos, findUserById, insertTodo, findTodoById, updateTodoById } from "../services";



export const createTodoController = async (req: customRequest<{}, any, todoReqBody>, res: Response) => {
    try {
        const userId: string | undefined = req.payload?.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | undefined = await findUserById(userId);
        if (!existingUser) {
            res.status(404).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const { description, completed } = req.body

        if (typeof description !== 'string' || typeof completed !== 'boolean') {
            res.status(400).json({ error: 'Invalid request body. Required fields: name (string), age (number), email (string).' });
            return;
        }
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

export const readTodoByUserController = async (req: customRequest, res: Response) => {
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

        const todos = await findTodosByUserId(userId);
        res.status(200).json({ messege: `Findout the  all todos added by ${existingUser.username}`, body: todos })
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error })
    }
}


export const updateTodoController = async (req: customRequest<{}, any, updateTodoReqBody>, res: Response) => {
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

        const { id, todo } = req.body;
        const { description, completed } = todo;
        if (typeof id !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
            res.status(400).json({error:'Invalid request body'});
            return;
        }

        const existingTodo:todoSchema | undefined = await findTodoById(id);
        if(!existingTodo){
            res.status(404).json({error:'Not found any todo item with given id'});
        }
        existingTodo.description = description;
        existingTodo.completed = completed;
        await updateTodoById(id,existingTodo);
        res.statusMessage = 'Updated Successfully'
        res.status(200).json({messege:'todo item updated successfully',body:existingTodo})
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error })
    }
}

export const deleteTodoController = async (req: customRequest, res: Response) => {
    
}