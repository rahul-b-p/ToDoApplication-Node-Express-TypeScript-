import { Response } from "express";
import { customRequest, updateUserBody, userSchema } from "../types";
import { deleteTodoByUserId, deleteUserById, findUserById, findUsers, updateUserById } from "../services";
import { loggers } from "../utils/winston.util";
import { getEncryptedPassword, verifyPassword } from "../config";




export const readAllUsersControlller = async (req: customRequest, res: Response) => {
    try {
        const id = req.payload?.id;
        if (!id) {
            res.status(400).json({ error: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser = await findUserById(id);
        if (!existingUser) {
            res.status(400).json({ error: 'You are requested from an invalid user id' });
            return;
        }

        const users: userSchema[] | [] = await findUsers();
        type resultSchema = Omit<userSchema, 'hashPassword'>;
        const responseBody: resultSchema[] = users.map(({ id, username, email }) => ({ id, username, email }));
        res.status(200).json({ message: 'Found the list of all users of the application', body: responseBody });
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

export const updateUserConroller = async (req: customRequest<{}, any, updateUserBody>, res: Response) => {
    try {
        const { currentPassword, updatePassword, updateEmail, updateUsername } = req.body;
        if (typeof currentPassword !== 'string' || (typeof updatePassword !== 'string' && typeof updateEmail !== 'string' && typeof updateUsername !== 'string')) {
            res.status(400).json({ error: 'Invalid Request Body' });
            return;
        }

        const id: string | undefined = req.payload?.id;
        if (!id) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | undefined = await findUserById(id);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const isVerifiedPassword = await verifyPassword(currentPassword, existingUser.hashPassword);
        if (!isVerifiedPassword) {
            res.status(400).json({ messege: 'Entered Password is InCorrect, please check' });
            return;
        }

        const hashPassword: string = updatePassword ? await getEncryptedPassword(updatePassword) : existingUser.hashPassword

        const updatedUser: userSchema = {
            id,
            username: updateUsername ? updateUsername : existingUser.username,
            email: updateEmail ? updateEmail : existingUser.email,
            hashPassword
        };

        await updateUserById(id, updatedUser);
        res.statusMessage = "Updated Successfully";
        res.status(200).json({ messege: 'user updated successfully', body: { username: updatedUser.username, email: updatedUser.email } })
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

export const deleteUserController = async (req: customRequest, res: Response) => { 
    try {
        const id: string | undefined = req.payload?.id;
        if (!id) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        const existingUser: userSchema | undefined = await findUserById(id);
        if (!existingUser) {
            res.status(401).json({ messege: 'You are requested from an invalid user id' });
            return;
        }

        await deleteTodoByUserId(id);
        await deleteUserById(id);
        res.statusMessage="Deleted User";
        res.status(200).json({message:'Your Account has been removed successfully'});
    } catch (error) {
        loggers.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}