import { Request, Response } from "express";
import { userLoginBody, userSchema, userSignupBody } from "../types";
import { generateId, getEncryptedPassword, verifyPassword } from "../config";
import { findUserByMail, insertUser } from "../services";
import { loggers } from "../utils/winston.util";
import { getAccessToken } from "../config/jwt";
import { blackListToken } from "../config";



export const signup = async (req: Request<{}, null, userSignupBody>, res: Response) => {
    try {
        const { username, email, password } = req.body;
        if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).json({ error: 'Invalid Request Body' });
            return;
        }

        const existingUser = await findUserByMail(email);
        if (existingUser) {
            res.status(409).json({ messege: "User Already Exists" })
        }
        else {
            const id: string = generateId();
            const hashPassword = await getEncryptedPassword(password);
            const newUser: userSchema = {
                id,
                username,
                email,
                hashPassword
            };
            await insertUser(newUser);
            res.statusMessage = "Registered Successfully";
            res.status(200).json({ messege: "added new User", body: { username, email } });
        }

    } catch (error) {
        loggers.error(error);
        res.status(500).send(error)
    }
}


export const login = async (req: Request<{}, any, userLoginBody>, res: Response) => {
    try {
        const { email, password } = req.body;
        if (typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).json({ error: 'Invalid ReqBody' });
            return;
        }
        const existingUser: userSchema | null = await findUserByMail(email);
        if (existingUser) {
            const isVerifiedPassword = await verifyPassword(password, existingUser.hashPassword);
            if (isVerifiedPassword) {
                const accessToken = getAccessToken(existingUser.id);
                res.statusMessage = "Login Successfull";
                res.status(200).json({ auth: true, accessToken });
            }
            else {
                res.statusMessage = "Incorrect Password";
                res.status(400).json({ messege: "Entered Password is incorrect, please check again" });
            }
        }
        else {
            res.statusMessage = "User not Found";
            res.status(404).json({ messege: "No any existing user with given email, Please Sign up" });
        }
    } catch (error) {
        loggers.error(error);
        res.status(500).send(error)
    }
}

export const logout = async (req: Request, res: Response) => {
    try {

        const accessToken = req.headers.authorization?.split(' ')[1];
        if (accessToken) {
            const isBlacklisted = await blackListToken(accessToken);
            if (isBlacklisted) {
                res.statusMessage = "Logout Successfull";
                res.status(200).json({ message: 'Succsessfully completed your logout with invalidation of accesstoken' });
            } else {
                res.status(500).json({ message: 'Failed to blacklist token' });
            }
        }

    } catch (error) {
        loggers.error(error);
        res.status(500).send(error)
    }
}