import { Response } from "express";
import { customRequest, userSchema } from "../types";
import { findUserById, findUsers } from "../services";
import { loggers } from "../utils/winston.util";




export const readAllUsersControlller =async(req:customRequest,res:Response)=>{
    try {
        const id = req.payload?.id;
        if(!id){
            res.status(400).json({error:'You are requested from an invalid user id'});
            return;
        }

        const existingUser = await findUserById(id);
        if(!existingUser){
            res.status(400).json({ error: 'You are requested from an invalid user id' });
            return;
        }

        const users:userSchema[]|[] = await findUsers();
        type resultSchema = Omit<userSchema,'hashPassword'>
        const responseBody:resultSchema[]= users.map(({id,username,email})=>({id,username,email})) 
        res.status(200).json({message:'Found the list of all users of the application',body:responseBody})
    } catch (error) {
        loggers.error(error);
        res.status(500).json({message:'Something went wrong', error})
    }
}