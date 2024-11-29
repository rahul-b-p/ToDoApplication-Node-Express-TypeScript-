import { Request, Response } from "express";
import { userLoginBody, userSignupBody } from "../types";


export const signupController = async (req: Request<{}, null, userSignupBody>, res: Response) => {
    
}


export const loginController = async (req: Request<{}, any, userLoginBody>, res: Response) => {

}