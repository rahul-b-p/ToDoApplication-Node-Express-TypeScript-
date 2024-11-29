import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { loggers } from "../utils/winston.util";



export const jwtAuthMiddleware =(req:Request,res:Response, next:NextFunction)=>{
    try {
        const accessToken = req.headers.authorization?.split(' ')[1]
        if (accessToken) {
            const secretKey = process.env.ACCESS_TOKEN_SECERT;

            if (!secretKey) {
                throw new Error('Access token secret is not defined');
            }
            const jwtResponse = Jwt.verify(accessToken, secretKey);
            loggers.info(jwtResponse)
        }
        else {
            res.status(400).json({message:"No AccessToken Found"});
        }
    } catch (error) {
        res.status(400).json({message:"Authentication Failed",error});
    }
}