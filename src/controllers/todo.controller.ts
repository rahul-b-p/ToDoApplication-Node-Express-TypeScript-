import { Response } from "express";
import { loggers } from "../utils/winston.util";
import { customRequest, todoReqBody, todoSchema, userSchema, } from "../types";
import { generateId } from "../config";
import { findTodosByUserId, findTodos, findUserById, insertTodo, findTodoById, updateTodoById, deleteTodoById, deleteTodoByUserId } from "../services";



export const createTodo = async (req: customRequest<{}, any, todoReqBody>, res: Response) => {
    try {
        const userId: string | undefined = req.payload?.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | null = await findUserById(userId);
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


export const readAllTodo = async (req: customRequest, res: Response) => {
    try {
        const userId: string | undefined = req.payload?.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | null = await findUserById(userId);
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


export const readTodosByUser = async (req: customRequest, res: Response) => {
    try {
        const userId: string | undefined = req.payload?.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | null = await findUserById(userId);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const todos = await findTodosByUserId(userId);
        if (!todos) {
            res.status(404).json({ message: 'No todows added by the user' });
            return;
        }
        res.status(200).json({ messege: `Findout the  all todos added by ${existingUser.username}`, body: todos })
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error })
    }
}


export const updateTodo = async (req: customRequest<{ id: string }, any, todoReqBody>, res: Response) => {
    try {
        const { id } = req.params;
        const { description, completed } = req.body;
        if (typeof description !== 'string' || typeof completed !== 'boolean') {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }

        const userId: string | undefined = req.payload?.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | null = await findUserById(userId);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingTodo: todoSchema | null = await findTodoById(id);
        if (!existingTodo) {
            res.status(404).json({ error: 'Not found any todo item with given id' });
            return;
        }
        if (existingTodo.userId !== userId) {
            res.status(401).json({ error: "You are unauthorized to update this todo" });
            return;
        }
        existingTodo.description = description;
        existingTodo.completed = completed;
        await updateTodoById(id, existingTodo);
        res.statusMessage = 'Updated Successfully'
        res.status(200).json({ messege: 'todo item updated successfully', body: existingTodo })
    } catch (error: any) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}


export const deleteTodo = async (req: customRequest<{ id: string }>, res: Response) => {
    try {
        const userId: string | undefined = req.payload?.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | null = await findUserById(userId);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const { id } = req.params;
        const existingTodo = await findTodoById(id);
        if (existingTodo && existingTodo.userId !== userId) {
            res.status(401).json({ error: "You are unauthorized to delete this todo" });
            return;
        }

        const result = await deleteTodoById(id);
        if (!result) {
            res.status(404).json({ messege: 'Not found any todo item with given id' });
            return;
        }
        res.statusMessage = "Deleted Successflly"
        res.status(200).json({ messege: 'Deleted todo with diven id' });
    } catch (error: any) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}


export const deleteTodosByUser = async (req: customRequest, res: Response) => {
    try {
        const userId: string | undefined = req.payload?.id;
        if (!userId) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | null = await findUserById(userId);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const result = await deleteTodoByUserId(userId);
        loggers.info(result);
        if (!result) {
            res.status(404).json({ messege: 'Not found any todo item with given id' });
            return;
        }
        res.statusMessage = " Deleted Successfully";
        res.status(200).json({ messege: `Deleted all todos added by ${existingUser.username}` });
    } catch (error: any) {
        loggers.error(error);
        res.status(500).json({ messege: 'Something went wrong', error });
    }
}