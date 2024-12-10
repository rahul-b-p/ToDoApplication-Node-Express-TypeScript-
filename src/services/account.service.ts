import { loggers } from "../utils/winston.util"
import { readData, writeData } from "./file.service";
import { findTodos } from "./todo.service";
import { findUsers } from "./user.service";



export const deleteAccountById = async (id: string): Promise<boolean> => {
    try {
        const users = await findUsers();
        const userDeleteIndex = users.findIndex(item => item.id == id);
        if (userDeleteIndex !== -1) {
            users.splice(userDeleteIndex, 1);
            const todos = await findTodos();
            const updatedTodos = todos.filter(item => item.userId !== id);
            const data = await readData();
            data.todos = updatedTodos;
            data.users = users;
            await writeData(data);
            true
        }
        return false;
    } catch (error) {
        loggers.error(error);
        throw new Error("Can't Delete Account due to an error");
    }
}