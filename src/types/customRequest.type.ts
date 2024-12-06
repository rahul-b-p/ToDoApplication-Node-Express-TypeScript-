import { Request } from "express";

export interface customRequest extends Request{
    payload?:{
        id:string
    }
}