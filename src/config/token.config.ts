import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';
import redisClient from '../utils/redis.util';


export const blackListToken = async (token: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await redisClient.set(token, 'Blacklisted');
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

export const checkTokenBlacklist=async(token:string)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const result = await redisClient.get(token);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}